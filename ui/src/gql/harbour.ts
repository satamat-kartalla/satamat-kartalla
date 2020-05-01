import { gql, useMutation } from '@apollo/client'

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

export const useAddHarbour = () => {
  const [addHarbour, { data }] = useMutation(ADD_HARBOUR, {
    update(cache, { data: { addHarbour } }) {
      const { harbours }: any = cache.readQuery({ query: GET_HARBOURS })
      cache.writeQuery({
        query: GET_HARBOURS,
        data: { harbours: harbours.concat([addHarbour]) },
      })
    },
  })

  return [addHarbour, data]
}
