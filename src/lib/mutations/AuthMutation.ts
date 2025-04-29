import { gql } from "@apollo/client";

export const AUTH = gql`
  mutation Auth($customerName: String!, $phone: String!) {
    auth(customerName: $customerName, phone: $phone) {
      access
      refresh
      success
      shops {
        id
        name
        storages {
          id
          name
        }
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshTokenMutation($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      payload
      refreshExpiresIn
      refreshToken
      token
    }
  }
`;
// export const AUTH = gql`
//   mutation Auth($customerName: String!, $phone: String!) {
//     auth(
//       customerName: $customerName
//       phone: $phone
//     ) {
//       token
//       success
//       shops {
//         id
//         storages {
//           id
//         }
//       }
//     }
//   }
// `;
