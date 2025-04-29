/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from "@apollo/client";

export const BARCODES_QUERY = gql`
  query Barcodes($search: String, $categories: ID, $limit: Int, $offset: Int) {
    barcodes(search: $search, category: $categories, limit: $limit, offset: $offset) {
      id
      title
      sellingPrice
      discountedPrice
      category {
        name
      }
      images {
        id
        file
      }
      commentsQuantity
    }
  }
`;

export const BARCODES_BY_CATEGORY = gql`
  query Barcodes_By_Category($name: String) {
    categories(name: $name) {
      id
      name
      barcodes {
        id
        title
        sellingPrice
        discountedPrice
        category {
          name
        }
        images {
          id
          file
        }
        commentsQuantity
      }
    }
  }
`;
