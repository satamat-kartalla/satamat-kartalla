import './App.css'
import React from 'react'
import MapContainer from './components/mapContainer'
import Layout from './components/layout'

const App = () => {
  return (
    <div className="App">
      <Layout>
        <MapContainer />
      </Layout>
    </div>
  )
}

export default App
