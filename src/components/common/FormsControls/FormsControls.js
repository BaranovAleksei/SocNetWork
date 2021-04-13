import React from "react"
import s from './FormsControls.module.sass'
import {Field} from "redux-form";

export const FormControl = ({input,  meta: {touched, error}, children}) => {
	const hasError = touched && error
	return (
		<>
			<div className={s.formControl + '' + (hasError ? s.error : '') }>
				{children}
			</div>
			{ hasError && <span>{error}</span>}
		</>
	)
}

export const Textarea = (props) => {
	const {input, meta, child, ...restProps} = props
	return <FormControl {...props}><textarea {...input}{...restProps} /></FormControl>
}

export const Input = (props) => {
	const {input, meta, child, ...restProps} = props
	return <FormControl {...props}><input {...input}{...restProps} /></FormControl>
}

export const createField = (placeholder, name, validators, component, props = {}, text='') => {
	return <div>
		<Field placeholder = {placeholder} name={name}
			   validate = {validators}
			   component = {component}
               {...props}
		/> {text}
	</div>
}