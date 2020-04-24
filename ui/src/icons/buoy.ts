import L from 'leaflet'

const northBuoy = new L.Icon({
  iconUrl: require('../img/north.svg'),
  iconRetinaUrl: require('../img/north.svg'),
  iconAnchor: undefined,
  popupAnchor: [10, -32],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(16, 24),
  className: 'awesome-marker-icon-transparent',
})
const eastBuoy = new L.Icon({
  iconUrl: require('../img/east.svg'),
  iconRetinaUrl: require('../img/east.svg'),
  iconAnchor: undefined,
  popupAnchor: [10, -32],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(16, 24),
  className: 'awesome-marker-icon-transparent',
})
const southBuoy = new L.Icon({
  iconUrl: require('../img/south.svg'),
  iconRetinaUrl: require('../img/south.svg'),
  iconAnchor: undefined,
  popupAnchor: [10, -32],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(16, 24),
  className: 'awesome-marker-icon-transparent',
})
const westBuoy = new L.Icon({
  iconUrl: require('../img/west.svg'),
  iconRetinaUrl: require('../img/west.svg'),
  iconAnchor: undefined,
  popupAnchor: [10, -32],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(16, 24),
  className: 'awesome-marker-icon-transparent',
})

export default [northBuoy, eastBuoy, southBuoy, westBuoy]
