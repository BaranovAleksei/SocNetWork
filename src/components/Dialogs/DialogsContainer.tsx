import React  from 'react';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {changeMessageBody, sendMessage} from "../../redux/dialogspage-reducer";
import { AllAppTypes } from '../../redux/redux-store';

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
  isAuth: boolean
}
type mapDispatchToPropsType = {
  changeMessage: ( text: string) => void
  addMessage: (newMessage: string) => void
}

type DialogsContainerPT = mapStateToPropsType & mapDispatchToPropsType

const DialogsContainer: React.FC<DialogsContainerPT> = ({ dialogs,
                                                          messages,
                                                          messageForNewMessage,
                                                          changeMessage, addMessage, isAuth}) => {
  return (
    <Dialogs dialogs={dialogs}
             messages={messages}
             addMessage={addMessage}
             changeMessage={changeMessage}
             messageForNewMessage={messageForNewMessage}
             isAuth={ isAuth }/>
  )
}

const mapStateToProps = ( state: AllAppTypes ): mapStateToPropsType => {
  return {
    dialogs: state.DialogsPage.dialogs,
    messages: state.DialogsPage.messages,
    messageForNewMessage: state.DialogsPage.messageForNewMessage,
    isAuth: state.Auth.isAuth
  }
}

const mapDispatchToProps = ( dispatch: any): mapDispatchToPropsType => {
  return {
    changeMessage:  ( text: string ) => {
      const action = changeMessageBody(text);
      dispatch (action);
    },
    addMessage: (newMessage: string) => {
      const action = sendMessage( newMessage)
      dispatch( action );
    }
  }
}

export default connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps, mapDispatchToProps)( DialogsContainer );