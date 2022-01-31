import { gql } from '@apollo/client';

export const QUERY_MODELS = gql`
  query queryModels {
      models {
        id
        tournament {
            id
        }
        owner
        predictionLicense
        createdAt
        
        predictionCount
      }
  }
`;

export const QUERY_MODEL = gql`
  query queryModel($id: ID!) {
    models(where: {id: $id}) {
        id
        tournament {
            id
        }
        owner
        predictionLicense
        createdAt
        predictions {  
            id
            executionStartAt
            encryptedContent
            predictionKeyPublication {
                contentKey
            }
            createdAt
        }
        
        predictionCount
    }
  }
`;
