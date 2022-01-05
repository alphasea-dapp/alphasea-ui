import { gql } from '@apollo/client';

export const QUERY_TOURNAMENTS = gql`
  query queryTournaments {
      tournaments {
        id
        description
        executionTime
      }
  }
`;
