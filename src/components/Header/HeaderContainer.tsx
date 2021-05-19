import React from 'react'
import { Header } from "./Header"
import { connect } from "react-redux"
import {logout} from "../../redux/auth-reducer"
import { AllAppTypes } from "../../redux/redux-store"

type mapStateToPT = {
	userId: number | null
	email: string | null
	isAuth: boolean
	login: string | null
}
type mapDispatchToPT= {
	logout: () => void
}

export type AuthContainerType = mapStateToPT & mapDispatchToPT

class HeaderContainer extends React.Component<AuthContainerType> {

	render() {
		return <>
			<Header {...this.props}/>
		</>
	}
}

const mapStateToProps = ( state: AllAppTypes): mapStateToPT => ({
	isAuth: state.Auth.isAuth,
	login: state.Auth.login,
	userId: state.Auth.userId,
	email: state.Auth.email
})

export default connect<mapStateToPT, mapDispatchToPT, {}, AllAppTypes>(mapStateToProps,
	{ logout })
	(HeaderContainer)