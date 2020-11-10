import {ActionType, MessagesType} from "./state";


export const changeMessageBodyAC = (textNewMessage: string) => {
  return {
    type: 'CHANGE-NEW-MESSAGE',
    messageForNewMessage: textNewMessage
  }as const
};
export const sendMessageAC = (newMessage: string) => {
  return {
    type: 'SEND-MESSAGE',
    postMessage: newMessage
  }as const
};

const dialogsReducer = (state: any , action: ActionType) => {
  switch (action.type) {

    case "CHANGE-NEW-MESSAGE":
      state.messageForNewMessage = action.messageForNewMessage;
      return state;

    case "SEND-MESSAGE":
      const newMessage: MessagesType = {
        'id': new Date().getTime(),
        'message': action.postMessage
      }
      state.messageForNewMessage = '';
      state.messages.push(newMessage);
      return  state;

    default:
      return state;
  }

}

export default dialogsReducer;