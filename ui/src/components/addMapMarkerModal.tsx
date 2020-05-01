import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal } from 'react-rainbow-components'
import { LatLong } from '../types'
import { ADD_HARBOUR, GET_HARBOURS } from '../gql/harbour'
import { ADD_SEAMARK, GET_SEAMARKS } from '../gql/seamark'

type props = {
  isOpen: boolean
  onClose(): void
  selectedLocation: LatLong
}

const MARKER_TYPES = {
  harbour: 0,
  seamark: 1,
}

const SEAMARK_DIRECTIONS = {
  north: 0,
  east: 1,
  south: 2,
  west: 3,
}

type NewMarkData = {
  markerType: number
  description: string
  name: string
  seamarkDirection: string
}

const AddMapMarkerModal = ({ isOpen, onClose, selectedLocation }: props) => {
  const { lat, lng } = selectedLocation
  const [newMarkData, setNewMarkData] = useState<Partial<NewMarkData>>({})
  const [addHarbour] = useMutation(ADD_HARBOUR, {
    update(cache, { data: { addHarbour } }) {
      const { harbours }: any = cache.readQuery({ query: GET_HARBOURS })
      cache.writeQuery({
        query: GET_HARBOURS,
        data: { harbours: harbours.concat([addHarbour]) },
      })
    },
  })
  const [addSeamark] = useMutation(ADD_SEAMARK, {
    update(cache, { data: { addSeamark } }) {
      const { seamarks }: any = cache.readQuery({ query: GET_SEAMARKS })
      cache.writeQuery({
        query: GET_SEAMARKS,
        data: { seamarks: seamarks.concat([addSeamark]) },
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { markerType } = newMarkData
    if (markerType === MARKER_TYPES.harbour) {
      const { name, description } = newMarkData
      const { lat, lng } = selectedLocation
      addHarbour({ variables: { lat, lng, name, description } })
    }

    if (markerType === MARKER_TYPES.seamark) {
      const { seamarkDirection, description } = newMarkData
      const { lat, lng } = selectedLocation
      addSeamark({
        variables: { lat, lng, type: seamarkDirection, description },
      })
    }

    onClose()
  }

  const handleFormDataChange = (target: string, value: string | number) => {
    setNewMarkData({ ...newMarkData, [target]: value })
  }

  const harbourForm = (
    <>
      <label htmlFor="harbourName">Nimi</label>
      <input
        required
        className="u-full-width"
        id="markerDescription"
        onChange={e => handleFormDataChange('name', e.target.value)}
      ></input>

      <label htmlFor="harbourDescription">Selite</label>
      <textarea
        className="u-full-width"
        id="harbourDescription"
        onChange={e => handleFormDataChange('description', e.target.value)}
      ></textarea>

      <button className="button-primary">Lisää</button>
    </>
  )

  const seamarkForm = (
    <>
      <label>Merkin suunta</label>
      <select
        className="u-full-width"
        required
        onChange={e =>
          handleFormDataChange('seamarkDirection', parseInt(e.target.value))
        }
      >
        <option>Suunta</option>
        {Object.entries(SEAMARK_DIRECTIONS).map(([k, v]) => (
          <option key={v} value={v}>
            {k}
          </option>
        ))}
      </select>

      <label htmlFor="harbourDescription">Selite</label>
      <textarea
        className="u-full-width"
        id="harbourDescription"
        onChange={e => handleFormDataChange('description', e.target.value)}
      ></textarea>

      <button className="button-primary">Lisää</button>
    </>
  )

  return (
    <Modal id="modal-1" isOpen={isOpen} onRequestClose={onClose}>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h4 style={{ marginBottom: '0px' }}>Lisää uusi merkki</h4>
          </div>

          <div className="row">
            <small>{`Sijainti ${lat.toFixed(2)}, ${lng.toFixed(2)}`}</small>
          </div>

          <div className="row" style={{ marginTop: '1rem' }}>
            <div className="u-full-width">
              <label>Merkin tyyppi</label>
              <select
                className="u-full-width"
                onChange={e =>
                  handleFormDataChange('markerType', parseInt(e.target.value))
                }
              >
                <option>Tyyppi</option>
                {Object.entries(MARKER_TYPES).map(([k, v]) => (
                  <option key={v} value={v}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            {newMarkData.markerType === MARKER_TYPES.harbour && harbourForm}
            {newMarkData.markerType === MARKER_TYPES.seamark && seamarkForm}
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default AddMapMarkerModal
