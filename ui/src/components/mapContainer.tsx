import React, { useState } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

type LatLong = {
  lat: number
  lng: number
}

const MapContainer = () => {
  const [markers, setMarkers] = useState<LatLong[]>([])
  const position: LatLong = { lat: 60.19, lng: 24.94 }

  const addMarker = (e: { latlng: LatLong }) => {
    setMarkers([...markers, e.latlng])
  }

  console.log({ markers })
  const markersToMap = markers.map((latlong: LatLong) => (
    <Marker position={latlong} key={'' + latlong.lat + latlong.lng}>
      <Popup>
        <span>
          A pretty CSS3 popup. <br /> Easily customizable.
        </span>
      </Popup>
    </Marker>
  ))

  return (
    <Map onClick={addMarker} center={position} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <TileLayer url="https://t1.openseamap.org/seamark/{z}/{x}/{y}.png" />
      {markersToMap}
    </Map>
  )
}

export default MapContainer
