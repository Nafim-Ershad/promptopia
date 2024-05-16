"use client"

import { SessionProvider } from "next-auth/react"

type ProviderType = {
  children: React.ReactNode
}

function Provider({children}: ProviderType): React.ReactNode {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider