import { faAnchor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
import {
  VerticalItem,
  VerticalNavigation,
  VerticalSection,
} from 'react-rainbow-components'

const Layout = ({ children }: { children: ReactNode }) => (
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

export default Layout
