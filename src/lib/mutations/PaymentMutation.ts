import { gql } from "@apollo/client";

// export const CREATE_ORDER = gql`
//   mutation CreateOrder(
//     $additionally: String!
//     $address: String!
//     $items: [ID!]!
//     $orderNote: String!
//   ) {
//     createOrder(
//       additionally: $additionally
//       address: $address
//       items: $items
//       orderNote: $orderNote
//     ) {
//       order {
//         id
//         status
//         createdAt
//         updatedAt
//         price
//         items {
//           title
//         }
//       }
//     }
//   }
// `;

export const CREATE_ORDER = gql`
  mutation CreateOrder($additionally: String!, $address: String!, $items: [ItemInput!]!) {
    createOrder(additionally: $additionally, address: $address, items: $items) {
      order {
        createdAt
        id
        price
        status
        updatedAt
      }
    }
  }
`;
