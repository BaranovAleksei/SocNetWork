import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {NewMessageFormValuesType} from '../Dialogs';


const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = GetStringKeys<NewMessageFormValuesType>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType>
  = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMessageFormValuesKeysType>("Enter your message", 'newMessageBody', [required, maxLength50], Textarea)}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

export default reduxForm<NewMessageFormValuesType>({form: 'dialog-add-message-form'})(AddMessageForm);