import { gql } from "@apollo/client";

export const BARCODES_TITLE_ID_QUERY = gql`
  query Barcodes($search: String) {
    barcodes(search: $search) {
      id
      title
    }
  }
`;
