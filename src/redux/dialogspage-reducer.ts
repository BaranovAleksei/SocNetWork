import React from "react"

export type DialogsType = {
  id: number
  name: string
};
export type MessagesType = {
  id: number
  message: string
};

export type DialogPageType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
}

export const sendMessage = (newMessage: string) => {
  return {
    type: 'SEND-MESSAGE',
    postMessage: newMessage
  }as const
};

export type DialogsPageActionType = ReturnType<typeof sendMessage>

const initialState: DialogPageType = {
  dialogs: [
    {id: 1, name: 'Dimon'},
    {id: 2, name: 'Andrew'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Viktor'},
    {id: 6, name: 'Valera'}
  ],
  messages: [
    {id: 1, message: 'Nihay'},
    {id: 2, message: 'What is you name?'},
    {id: 3, message: 'when?'},
    {id: 4, message: 'Whot?'},
    {id: 5, message: 'Ho?'}
  ]
}

const dialogsReducer = (state = initialState , action: DialogsPageActionType): DialogPageType  => {
  switch (action.type) {

    case "SEND-MESSAGE":
      const newMessage: MessagesType = {
        'id': new Date().getTime(),
        'message': action.postMessage
      }
      return {
        ...state,
        messages: [...state.messages, newMessage]
      }
    default:
      return state;
  }
}

export default dialogsReducer;