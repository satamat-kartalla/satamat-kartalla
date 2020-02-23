import React, { useState } from 'react'
import { Lookup } from 'react-rainbow-components'
import axios from 'axios'

type Timeout = ReturnType<typeof setTimeout>
type PlaceInfo = {
  name: string
  formatted_address: string
  geometry: { location: { lat: number; lng: number } }
}
type PlaceOption = {
  label: string
  location: { lat: number; lng: number }
}

const containerStyles = {
  maxWidth: '700px',
}

const MapSearch = ({ callback }: any) => {
  const [options, setOptions] = useState<PlaceOption[]>([])
  const [searchTimeout, setSearchTimeout] = useState<Timeout | null>(null)

  const search = (e: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    const timeout = setTimeout(() => fetchSearch(e), 666)
    setSearchTimeout(timeout)
  }

  const fetchSearch = async (query: string) => {
    const resp = await axios.get(`http://localhost:8888/search?query=${query}`)
    setOptions(parseResponse(resp.data))
  }

  const parseResponse = (resp: PlaceInfo[]) =>
    resp.map((r: PlaceInfo) => ({
      label: r.formatted_address,
      location: r.geometry.location,
    }))

  const handleOnChange = (option: PlaceOption) => {
    if (option) {
      callback(option.location)
    }
  }

  return (
    <Lookup
      id="lookup-1"
      placeholder="Find"
      options={options}
      value={undefined}
      onChange={option => handleOnChange(option as PlaceOption)}
      onSearch={search}
      style={containerStyles}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
    />
  )
}

export default MapSearch

const asd = {
  html_attributions: [],
  results: [
    {
      formatted_address: '21680 Nötö',
      geometry: {
        location: {
          lat: 59.9554773,
          lng: 21.7602174,
        },
        viewport: {
          northeast: {
            lat: 59.95827689999999,
            lng: 21.7667913,
          },
          southwest: {
            lat: 59.94697559999999,
            lng: 21.7520369,
          },
        },
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
      id: '835991441fb61c5f7bc9cd22a6a7c39b16b3bcd2',
      name: 'Nötö',
      photos: [
        {
          height: 1197,
          photo_reference:
            'CmRaAAAAysRIjSR9dOICHyYF_rvMrHsIRhisgOcbItSWpMiVSHrWIl044jGWoXWIGDt9Em-LPOMPA6zjqjzd6GLtj9oCd6Bg-6K2iAgh2ZS3CIBt62jEzSfTzqhyqzD4M_ffgHPJEhBAlxlEEUiqB3s81fBrmRZ3GhSwk8Q2fG_a5Mq8o2zHH9-wo4jm_w',
          width: 1596,
        },
      ],
      place_id: 'ChIJhf3vMk6ejEYRK2mq2U3ervM',
      reference: 'ChIJhf3vMk6ejEYRK2mq2U3ervM',
      types: ['locality', 'political'],
    },
  ],
  status: 'OK',
}
