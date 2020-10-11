import React from 'react';

type DialogItemType = {
  name: string
  id: number
}

export function DialogItem (props: DialogItemType) {
  return (
    <div>
      <span> {props.name} </span>
    </div>
  )
}