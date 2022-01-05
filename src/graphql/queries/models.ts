import { gql } from '@apollo/client';

export const QUERY_MODELS = gql`
  query queryModels {
      models {
        id
        owner
      }
  }
`;
