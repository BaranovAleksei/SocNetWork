import React  from 'react';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {changeMessageBodyAC, sendMessageAC} from "../../redux/dialogspage-reducer";
import { AllAppTypes } from '../../redux/redux-store';

// type DialogsContainerPropsType = {
//   store: StoreType
// }

// export const DialogsContainer: React.FC<DialogsContainerPropsType> = (props: DialogsContainerPropsType) => {
//
//   const state = props.store.getState()
//
//   const changeMessage = ( text: string ) => {
//     const action = changeMessageBodyAC(text);
//     props.store.dispatch(action);
//   }
//   const addMessage = () => {
//     props.store.dispatch(sendMessageAC( state.DialogsPage.messageForNewMessage));
//   }
//
//   return <Dialogs  dialogs = { state.DialogsPage.dialogs }
//                    messages = { state.DialogsPage.messages }
//                    messageForNewMessage = { state.DialogsPage.messageForNewMessage }
//                    changeMessage = { changeMessage }
//                    addMessage = { addMessage }
//                   />
// }

type DialogsType = {
  id: number
  name: string
};
type MessagesType = {
  id: number
  message: string
};

type mapStateToPropsType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
  messageForNewMessage: string
}
type mapDispatchToPropsType = {
  changeMessage: ( text: string) => void
  addMessage: (newMessage: string) => void
}

type DialogsContainerPT = mapStateToPropsType & mapDispatchToPropsType

const DialogsContainer: React.FC<DialogsContainerPT> = ({ dialogs,
                                                          messages,
                                                          messageForNewMessage,
                                                          changeMessage, addMessage}) => {
  return (
    <Dialogs dialogs={dialogs}
             messages={messages}
             addMessage={addMessage}
             changeMessage={changeMessage}
             messageForNewMessage={messageForNewMessage}/>
  )
}

const mapStateToProps = ( state: AllAppTypes ): mapStateToPropsType => {
  return {
    dialogs: state.DialogsPage.dialogs,
    messages: state.DialogsPage.messages,
    messageForNewMessage: state.DialogsPage.messageForNewMessage
  }
}
const mapDispatchToProps = ( dispatch: any): mapDispatchToPropsType => {
  return {
    changeMessage:  ( text: string ) => {
      const action = changeMessageBodyAC(text);
      dispatch (action);
    },
    addMessage: (newMessage: string) => {
      const action = sendMessageAC( newMessage)
      dispatch( action );
    }
  }
}

export default connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps, mapDispatchToProps)( DialogsContainer );