import { gql } from "@apollo/client";

export const COMMENT_MUTATION = gql`
  mutation CreateComment($barcodeId: ID!, $commentText: String!) {
    createComment(barcodeId: $barcodeId, commentText: $commentText) {
      comment {
        id
        answer
        comment
        createdAt
        author {
          firstName
          lastName
        }
      }
    }
  }
`;
