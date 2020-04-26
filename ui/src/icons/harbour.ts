import L from 'leaflet'

const harbour = new L.Icon({
  iconUrl: require('../img/harbour.png'),
  iconRetinaUrl: require('../img/harbour.png'),
  iconAnchor: undefined,
  popupAnchor: [10, -32],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(32, 32),
  className: 'awesome-marker-icon-transparent',
})

export default harbour
