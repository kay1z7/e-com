import { gql } from "@apollo/client";

export const DETAIL_BARCODES_QUERY_FETCH = `
  query Barcode($id: ID!) {
    barcode(id: $id) {
      category {
        id
        name
      }
      id
      description
      title
      sellingPrice
      discountedPrice
      cost
      commentsQuantity
      characteristic
      images {
        file
      }
      comments {
        id
        comment
        author {
          firstName
          lastName
        }
        createdAt
      }
    }
  }
`;

export const DETAIL_BARCODES_QUERY = gql`
  query Barcode($id: ID!) {
    barcode(id: $id) {
      category {
        id
        name
      }
      id
      description
      title
      sellingPrice
      discountedPrice
      cost
      commentsQuantity
      characteristic
      images {
        file
      }
      comments {
        id
        comment
        author {
          firstName
          lastName
        }
        createdAt
      }
    }
  }
`;

export const DETAIL_BARCODES_COMMENTS = gql`
  query Barcode($id: ID!) {
    barcode(id: $id) {
      comments {
        id
        comment
        author {
          firstName
          lastName
        }
        createdAt
      }
    }
  }
`;
