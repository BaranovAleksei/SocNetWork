import React from 'react'

type MessageType = {
  message: string
}

export function Message (props: MessageType) {
  return (
    <div>
      <span>{props.message}</span>
    </div>
  )
}