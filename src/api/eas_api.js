import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// TODO: move to environment
export const client = new ApolloClient({
    uri: 'https://sepolia.easscan.org/graphql',
    cache: new InMemoryCache(),
  });

export const EMPLOYEE_ATTESTATIONS = gql `
query Attestations($where: AttestationWhereInput, $schemaNamesWhere: SchemaNameWhereInput) {
    attestations(where: $where) {
      id
      expirationTime
      data
      attester
      schema {
        schemaNames(where: $schemaNamesWhere) {
          schemaId
          name
        }
      }
    }
  }`;