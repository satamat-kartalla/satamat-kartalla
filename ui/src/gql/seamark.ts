import { gql, useMutation } from '@apollo/client'

export const GET_SEAMARKS = gql`
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
    $description: String
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

export const useAddSeamark = () => {
  const [addSeamark, { data }] = useMutation(ADD_SEAMARK, {
    update(cache, { data: { addSeamark } }) {
      const { seamarks }: any = cache.readQuery({ query: GET_SEAMARKS })
      cache.writeQuery({
        query: GET_SEAMARKS,
        data: { seamarks: seamarks.concat([addSeamark]) },
      })
    },
  })

  return [addSeamark, data]
}
