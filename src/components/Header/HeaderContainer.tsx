import React from 'react'
import { Header } from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";
import {AllAppTypes} from "../../redux/redux-store";

type mapStateToPT = {
	userId: string | null
	email: string | null
	isAuth: boolean
	login: string | null
}
type mapDispatchToPT= {
	setAuthUserData: (id: string, email: any, login: any) => void
}

export type AuthContainerType = mapStateToPT & mapDispatchToPT

class HeaderContainer extends React.Component<AuthContainerType> {
	componentDidMount() {
		// this.props.toggleIsFetching(false);
		axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
			withCredentials: true
		})

			.then(response => {
				if (response.data.resultCode === 0) {
					let { id, login, email  } = response.data.data
					this.props.setAuthUserData( id, email, login )
				}

			})
	}

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
	{ setAuthUserData })
	(HeaderContainer)