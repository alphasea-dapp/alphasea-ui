import { gql } from '@apollo/client';

export const QUERY_TOURNAMENTS = gql`
  query queryTournaments {
      tournaments {
        id
        executionStartAt
        predictionTime
        sendingTime
        executionPreparationTime
        executionTime
        publicationTime
        description
        createdAt
      }
  }
`;
