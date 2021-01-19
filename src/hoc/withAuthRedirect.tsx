import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AllAppTypes} from "../redux/redux-store";

const mapStateToPropsForRedirect = ( state: AllAppTypes ) => ({
	isAuth: state.Auth.isAuth
})

export const withAuthRedirect = ( Component: any ) => {
	class RedirectComponent extends React.Component<any, any> {
		render() {
			if (!this.props.isAuth) return <Redirect to = '/login' />
			return <Component {...this.props} />
		}
	}
	return connect(mapStateToPropsForRedirect)(RedirectComponent)
}