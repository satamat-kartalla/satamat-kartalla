import React, { useState } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { useQuery } from '@apollo/client'

import MapSearch from './mapSearch'
import buoyIcons from '../icons/buoy'
import harbourIcon from '../icons/harbour'
import AddMapMarkerModal from './addMapMarkerModal'
import { LatLong, Seamark, Harbour } from '../types'
import { GET_ALL_SEAMARKS } from '../gql/seamark'
import { GET_HARBOURS } from '../gql/harbour'

const MapContainer = () => {
  const { data: seamarkData } = useQuery(GET_ALL_SEAMARKS)
  const { data: harbourData } = useQuery(GET_HARBOURS)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<LatLong>({ lat: 59.92, lng: 22.42 })
  const [selectedLocation, setSelectedLocation] = useState<LatLong | null>(null)

  const handleModal = (e: { latlng: LatLong }) => {
    setIsModalOpen(true)
    setSelectedLocation(e.latlng)
  }

  const markersToMap = seamarkData?.seamarks?.map(
    ({ lat, lng, description, type }: Seamark) => (
      <Marker
        position={{ lat, lng }}
        key={`${lat} + ${lng}`}
        icon={buoyIcons[type]}
      >
        <Popup>
          <span>{description}</span>
        </Popup>
      </Marker>
    ),
  )

  const harboursToMap = harbourData?.harbours?.map(
    ({ lat, lng, description }: Harbour) => (
      <Marker
        position={{ lat, lng }}
        key={`${lat} + ${lng}`}
        icon={harbourIcon}
      >
        <Popup>
          <span>{description}</span>
        </Popup>
      </Marker>
    ),
  )

  const searchPositionCallback = (latlng: LatLong) => {
    setPosition(latlng)
  }

  return (
    <>
      {selectedLocation && (
        <AddMapMarkerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedLocation={selectedLocation}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          zIndex: 1000,
          left: 'calc(50vw - 210px + 110px)',
          width: '420px',
        }}
      >
        <MapSearch callback={searchPositionCallback} />
      </div>
      <Map onClick={handleModal} center={position} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <TileLayer url="https://t1.openseamap.org/seamark/{z}/{x}/{y}.png" />
        {markersToMap}
        {harboursToMap}
      </Map>
    </>
  )
}

export default MapContainer
