import { MantineProvider } from '@mantine/core'
import React from 'react'
import { theme } from '../src/styles'

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export const decorators = [
  (renderStory: any) => (
    <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
  ),
  (renderStory: any) => (
    <MantineProvider theme={theme}>{renderStory()}</MantineProvider>
  ),
]
