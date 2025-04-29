import { gql } from "@apollo/client";

// export const PAYMENT_STATUS_QUERY = gql`
//   query PaymentStatus($orderId: ID!) {
//     paymentStatus(orderId: $orderId) {
//       status
//     }
//   }
// `;

export const PAYMENT_STATUS_QUERY = gql`
  query PaymentStatus($orderId: ID!) {
    paymentStatus(orderId: $orderId)
  }
`;
