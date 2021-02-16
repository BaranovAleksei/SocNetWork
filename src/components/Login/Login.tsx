import React from "react";
import s from './Login.module.sass'
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux"
import {Input, createField} from '../common/FormsControls/FormsControls'
import {required} from "../../Utils/Validators/validators"
import {login} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import {AllAppTypes} from "../../redux/redux-store";

const LoginForm: React.FC<any> = (props) => {
	return <>
		<form onSubmit = {props.handleSubmit}>
			<div>
				<Field placeholder={'Login'}
				       name ={'email'}
				       validate = {[required]}
				       component={ Input } />
			</div>
			<div>
				<Field placeholder={'Password'}
				       name={'password'}
				       validate = {[required]}
				       component={ Input } />
			</div>
			<div>
				<Field component={'input'}
				       name = {'rememberMe'}
				       type="checkbox"/>
				remember me
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
		props.login(formData.email, formData.password, formData.rememberMe)
		console.log(formData.email, formData.password, formData.rememberMe)
	}

	if(props.isAuth) {
		return <Redirect to={'/profile'} />
	}

	return <div className={s.loginOverlay}>
		<h2>Login</h2>
		<LoginReduxForm onSubmit = { onSubmit } />
	</div>
}

type mapStateToPropsType = {
	isAuth: boolean
}
const mapStateToProps = (state: AllAppTypes): mapStateToPropsType => ({
	isAuth: state.Auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)