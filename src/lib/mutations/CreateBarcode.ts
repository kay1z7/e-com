/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { gql } from "@apollo/client";

export const UPLOAD_BARCODE_IMAGES = gql`
  mutation uploadImages($files: [Upload!]!) {
    uploadImages(files: $files) {
      images {
        id
        file
      }
    }
  }
`;

export const CREATE_BARCODE = gql`
  mutation CreateBarcode(
    $categoryId: ID!
    $characteristic: JSONString!
    $description: String!
    $images: [Int!]!
    $sellingPrice: Decimal!
    $shopId: ID!
    $sizes: [SizeInput!]!
    $storageId: ID!
    $title: String!
    $barcodeValue: String!
    $cost: Decimal!
    $discountedPrice: Decimal!
    $tags: String!
  ) {
    createBarcode(
      input: {
        categoryId: $categoryId
        characteristic: $characteristic
        description: $description
        images: $images
        sellingPrice: $sellingPrice
        shopId: $shopId
        sizes: $sizes
        storageId: $storageId
        title: $title
        barcodeValue: $barcodeValue
        cost: $cost
        discountedPrice: $discountedPrice
        tags: $tags
      }
    ) {
      barcode {
        id
        barcodeValue
        title
        description
        deleted
        sellingPrice
        slug
        archived
        createdAt
        mute
        discountedPrice
        cost
        tags
        characteristic
        images {
          id
          file
        }
      }
    }
  }
`;
