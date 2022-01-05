import { gql } from '@apollo/client';

export const QUERY_TOURNAMENTS = gql`
  query queryTournaments {
      tournaments {
        id
        executionStartAt
        predictionTime
        purchaseTime
        shippingTime
        executionPreparationTime
        executionTime
        publicationTime
        description
        createdAt
      }
  }
`;
