import React  from 'react';
import { StoreType } from './../../redux/state';
import {changeMessageBodyAC, sendMessageAC} from "../../redux/dialogspage-reducer";
import {Dialogs} from "./Dialogs";

type DialogsContainerPropsType = {
  store: StoreType
}

export const DialogsContainer: React.FC<DialogsContainerPropsType> = (props: DialogsContainerPropsType) => {

  const state = props.store.getState()

  const changeMessage = ( text: string ) => {
    const action = changeMessageBodyAC(text);
    props.store.dispatch(action);
  }
  const addMessage = () => {
    props.store.dispatch(sendMessageAC( state.DialogsPage.messageForNewMessage));
  }

  return <Dialogs  dialogs = { state.DialogsPage.dialogs }
                   messages = { state.DialogsPage.messages }
                   messageForNewMessage = { state.DialogsPage.messageForNewMessage }
                   changeMessage = { changeMessage }
                   addMessage = { addMessage }
                  />
}