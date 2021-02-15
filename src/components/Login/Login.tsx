import React from "react";
import s from './Login.module.sass'
import { FormsControls } from './../common/FormsControls/FormsControls'
import {Field ,reduxForm} from "redux-form";


const LoginForm: React.FC<any> = (props) => {

	return <>
			<form onSubmit = {props.handleSubmit}>
				<div>
					<Field placeholder={'Login'} name ={'login'} component={'input'} />
				</div>
				<div>
					<Field placeholder={'Password'} name={'password'} component={'input'} />
				</div>
				<div>
					<Field placeholder={'checkbox'} component={'input'}
						   name = {'rememberMe'} type="checkbox"/>remember me
				</div>
				<div>
					<button>login</button>
				</div>
			</form>
		</>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login: React.FC<any> = ( props) => {

	const onSubmit = (formData: any ) => {
		console.log(formData)
	}

	return <div className={s.loginOverlay}>
		<h2>Login</h2>
		<LoginReduxForm onSubmit = { onSubmit } />
	</div>
}

export default Login