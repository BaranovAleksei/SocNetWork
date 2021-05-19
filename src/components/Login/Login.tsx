import React from "react";
import s from './Login.module.sass'
import {InjectedFormProps, reduxForm} from "redux-form"
import {connect} from "react-redux"
import {Input, createField, GetStringKeys} from '../common/FormsControls/FormsControls'
import {required} from "../../utils/validators/validators"
import {login} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import {AllAppTypes} from "../../redux/redux-store"

type LoginFormOwnProps = {
  captchaUrl: string | null | undefined
}

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: null | string | undefined
}
type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                handleSubmit,
                                                                error,
                                                                captchaUrl}) => {
	return (
      <form onSubmit = {handleSubmit}>
        {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input )}
        {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
        {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input,
          {type: 'checkbox'}, 'remember me')}

        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}

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

export type LoginFormValuesType = {
  captcha: string
  rememberMe: boolean
  password: string
  email: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ( props) => {

	const onSubmit = (formData: LoginFormValuesType ) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
		console.log(formData.email, formData.password, formData.rememberMe)
	}

	if(props.isAuth) {
		return <Redirect to={'/profile'} />
	}

	return <div className={s.loginOverlay}>
		<h2>Login</h2>
		<LoginReduxForm onSubmit = { onSubmit } captchaUrl = { props.captchaUrl }/>
	</div>
}

const mapStateToProps = (state: AllAppTypes): MapStatePropsType => ({
	isAuth: state.Auth.isAuth,
  captchaUrl: state.Auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)