/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories(parent: false) {
      id
      name
      children {
        id
        name
      }
    }
  }
`;
