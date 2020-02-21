import React, { ReactNode } from 'react'
import {
  VerticalNavigation,
  VerticalSection,
  VerticalItem,
} from 'react-rainbow-components'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ height: '100vh' }}>
      <div
        style={{
          height: '50px',
          backgroundImage: 'linear-gradient(#c7bfbf, white)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 50px',
        }}
      >
        SadamPåCarto
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '220px', height: '100%' }}>
          <VerticalNavigation compact>
            <VerticalSection>
              <VerticalItem name="item-1" label="Recent" />
              <VerticalItem name="item-2" label="Projects" />
              <VerticalItem name="item-3" label="Folders" />
              <VerticalItem name="item-4" label="Settings" />
              <VerticalItem name="item-5" label="Reports" />
            </VerticalSection>
          </VerticalNavigation>
        </div>

        <div style={{ flex: 1, height: '100%' }}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
