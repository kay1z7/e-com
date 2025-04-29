"use client";

import "@/src/styles/globals.scss";

import { ApolloProvider } from "@apollo/client";

import { CartProvider } from "@/src/Context/cartContext";

import Layout from "../components/layout/Layout";
import client from "../lib/apolloClient";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ApolloProvider client={client}>
        <CartProvider>
          <Layout>{children}</Layout>
        </CartProvider>
      </ApolloProvider>
    </>
  );
}
