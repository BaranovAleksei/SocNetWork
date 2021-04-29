import React from "react";
import s from './Login.module.sass'
import {reduxForm} from "redux-form"
import {connect} from "react-redux"
import {Input, createField} from '../common/FormsControls/FormsControls'
import {required} from "../../utils/validators/validators"
import {login} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import {AllAppTypes} from "../../redux/redux-store";

type LoginFormOwnProps = {
  captchaUrl: string | null
}
export type LoginFormValuesType = {
  captcha: string
  rememberMe: boolean
  password: string
  email: string
}

const LoginForm: React.FC<any> = ({handleSubmit, error, captchaUrl}) => {
	return (
      <form onSubmit = {handleSubmit}>
        {createField('Email', 'email', [required], Input )}
        {createField('Password', 'password', [required], Input,
          {type: 'password'})}
        {createField(null, 'rememberMe', [], Input,
          {type: 'checkbox'}, 'remember me')}

        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}

        {error && <div className={s.formSummaryError}>
          { error }
        </div>}
        <div>
          <button>login</button>
        </div>
      </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)


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
		<LoginReduxForm onSubmit = { onSubmit } captchaUrl = {props.captchaUrl}/>
	</div>
}

type mapStateToPropsType = {
	isAuth: boolean
  captchaUrl: null | string | undefined
}
const mapStateToProps = (state: AllAppTypes): mapStateToPropsType => ({
	isAuth: state.Auth.isAuth,
  captchaUrl: state.Auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)