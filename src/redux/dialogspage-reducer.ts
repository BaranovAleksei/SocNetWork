import { DialogPageType, MessagesType} from "./state";

export const changeMessageBody = (textNewMessage: string) => {
  return {
    type: 'CHANGE-NEW-MESSAGE',
    messageForNewMessage: textNewMessage
  }as const
};
export const sendMessage = (newMessage: string) => {
  return {
    type: 'SEND-MESSAGE',
    postMessage: newMessage
  }as const
};

export type DialogsPageActionType = ReturnType<typeof changeMessageBody> & ReturnType<typeof sendMessage>

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
  ],
  messageForNewMessage: ''
}

const dialogsReducer = (state = initialState , action: DialogsPageActionType): DialogPageType  => {
  switch (action.type) {

    case "CHANGE-NEW-MESSAGE":
      return {
        ...state,
        messageForNewMessage: action.messageForNewMessage
      }

    case "SEND-MESSAGE":
      const newMessage: MessagesType = {
        'id': new Date().getTime(),
        'message': action.postMessage
      }
      return {
        ...state,
        messageForNewMessage: '',
        messages: [...state.messages, newMessage]
      }
    default:
      return state;
  }
}

export default dialogsReducer;