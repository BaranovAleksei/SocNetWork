import {InferActionsTypes} from "./redux-store"

const initialState = {
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
//actions
export const actions = {
  sendMessage: (newMessage: string) => ({type: 'SN/DIALOGS/SEND-MESSAGE', postMessage: newMessage}as const)
}

const dialogsReducer = (state = initialState , action: ActionsTypes): InitialStateType  => {
  switch (action.type) {
    case "SN/DIALOGS/SEND-MESSAGE":
      const newMessage = {
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

export default dialogsReducer

//type
export type InitialStateType = typeof initialState
export type ActionsTypes = InferActionsTypes<typeof actions>