import React, { createContext } from 'react'
import { Cable } from '@rails/actioncable'

interface ActionCableContextValue {
  consumer?: Cable
}

export const ActionCableContext = createContext<ActionCableContextValue>({})

export const CableProvider: React.FC<{ consumer: Cable }> = ({
  consumer,
  children,
}) => {
  return (
    <ActionCableContext.Provider value={{ consumer }}>
      {children}
    </ActionCableContext.Provider>
  )
}
