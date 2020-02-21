import React, { ReactNode } from 'react'
import {
  VerticalNavigation,
  VerticalSection,
  VerticalItem,
} from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor } from '@fortawesome/free-solid-svg-icons'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '220px', height: '100%' }}>
        <VerticalNavigation compact>
          <VerticalSection>
            <VerticalItem
              name="item-1"
              label="SadamPåCarto"
              icon={<FontAwesomeIcon icon={faAnchor} />}
            />
            <VerticalItem name="item-1" label="Juttu" />
            <VerticalItem name="item-2" label="Toka Juttu" />
            <VerticalItem name="item-3" label="Tässä on Tää" />
            <VerticalItem name="item-4" label="Tuolla on Toi" />
          </VerticalSection>
        </VerticalNavigation>
      </div>

      <div style={{ flex: 1, height: '100%' }}>{children}</div>
    </div>
  )
}

export default Layout
