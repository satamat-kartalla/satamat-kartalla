import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const MapContainer = () => {
  const position: [number, number] = [60.19, 24.94]

  return (
    <div style={{ height: '500px' }}>
      <Map center={position} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <TileLayer url="https://t1.openseamap.org/seamark/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  )
}

export default MapContainer
