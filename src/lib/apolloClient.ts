/* eslint-disable import/no-extraneous-dependencies */
import { ApolloClient, from, InMemoryCache, makeVar, Observable } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

import { REFRESH_TOKEN_MUTATION } from "@/src/lib/mutations/AuthMutation";

export const searchInputVar = makeVar("");
export const selectInputVar = makeVar("");

const httpLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}graphql/`,
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(`${localStorage.getItem("key")}`);
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    },
  };
});

const tokenClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const refresh = async () => {
  const refreshToken = JSON.parse(`${localStorage.getItem("refreshToken")}`);

  const result = await tokenClient.mutate({
    mutation: REFRESH_TOKEN_MUTATION,
    variables: { refreshToken },
  });
  if (result.data) {
    localStorage.setItem("key", JSON.stringify(result?.data?.refreshToken?.token));
    localStorage.setItem("refreshToken", JSON.stringify(result?.data?.refreshToken?.refreshToken));
  }

  return result?.data?.refreshToken?.token;
};

// eslint-disable-next-line consistent-return
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    // eslint-disable-next-line no-restricted-syntax
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED" || err?.message === "Signature has expired") {
        // eslint-disable-next-line consistent-return
        return new Observable((observer) => {
          refresh()
            .then((newToken) => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  Authorization: `JWT ${newToken}`,
                },
              });
              forward(operation).subscribe(observer);
            })
            .catch((refreshError) => {
              console.error("Error during token refresh: ", refreshError);
              localStorage.removeItem("key");
              localStorage.removeItem("refreshToken");
              observer.error(refreshError);
              window.location.href = "/";
            });
        });
      }
    }
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchResults: {
          read() {
            return searchInputVar();
          },
        },
        selectResults: {
          read() {
            return selectInputVar();
          },
        },
      },
    },
    Barcodes: {
      fields: {
        barcodes: {
          keyArgs: false,
          merge(existing, incoming, { args }) {
            const offset =  args?.offset ?? 0; 
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
});

export default client;
