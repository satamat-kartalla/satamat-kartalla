import { gql } from '@apollo/client'

export const ADD_HARBOUR = gql`
  mutation AddHarbour(
    $name: String!
    $lat: Float!
    $lng: Float!
    $description: String!
  ) {
    addHarbour(
      harbour: { name: $name, lat: $lat, lng: $lng, description: $description }
    ) {
      id
      name
      lat
      lng
      description
    }
  }
`

export const GET_HARBOURS = gql`
  query {
    harbours {
      id
      lat
      lng
      description
    }
  }
`
