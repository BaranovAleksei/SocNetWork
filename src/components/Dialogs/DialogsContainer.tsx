import React  from 'react';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import { sendMessage} from "../../redux/dialogs-reducer"
import { AllAppTypes } from '../../redux/redux-store'
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import { compose } from 'redux';

type DialogsType = {
  id: number
  name: string
}
type MessagesType = {
  id: number
  message: string
}
type mapStateToPropsType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
  // messageForNewMessage: string
}
type mapDispatchToPropsType = {
  // changeMessage: ( text: string) => void
  addMessage: (newMessage: string) => void
}

type DialogsContainerPT = mapStateToPropsType & mapDispatchToPropsType

const DialogsContainer: React.FC<DialogsContainerPT> = ({ dialogs,
                                                          messages,
                                                          // messageForNewMessage,
                                                          addMessage }) => {
  return (
    <Dialogs dialogs={dialogs}
             messages={messages}
             addMessage={addMessage}
             // changeMessage={changeMessage}
             // messageForNewMessage={messageForNewMessage}/>
             // isAuth={ isAuth }
    />
  )
}

const mapStateToProps = ( state: AllAppTypes ): mapStateToPropsType => {
  return {
    dialogs: state.DialogsPage.dialogs,
    messages: state.DialogsPage.messages,
    // messageForNewMessage: state.DialogsPage.messageForNewMessage
    // isAuth: state.Auth.isAuth
  }
}


const mapDispatchToProps = ( dispatch: any): mapDispatchToPropsType => {
  return {
    // changeMessage:  ( text: string ) => {
    //   const action = changeMessageBody(text);
    //   dispatch (action);
    // },
    addMessage: (newMessageBody: string) => {
      const action = sendMessage( newMessageBody)
      dispatch( action );
    }
  }
}

export default compose<React.ComponentType> (
  connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(DialogsContainer);