import { gql } from '@apollo/client'

export const GET_ALL_SEAMARKS = gql`
  {
    seamarks {
      id
      lat
      lng
      description
      type
    }
  }
`

export const ADD_SEAMARK = gql`
  mutation AddSeamark(
    $type: Float!
    $lat: Float!
    $lng: Float!
    $description: String!
  ) {
    addSeamark(
      seamark: { lat: $lat, lng: $lng, description: $description, type: $type }
    ) {
      id
      lat
      lng
      description
      type
    }
  }
`
