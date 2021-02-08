import React, {ChangeEvent} from 'react'
import s from "./Profile.module.sass"

type ProfileInfoType = {
	status: string
	updateStatus: (status: string) => void
}

class ProfileInfo extends React.Component<ProfileInfoType> {

	state = {
		editMode: false,
		status: this.props.status
	}

	activateEditMode = () => {
		this.setState({
			editMode: true
		})
	}
	deactivateEditMode = () => {
		this.setState({
			editMode: false
		})
		this.props.updateStatus(this.state.status)
	}
	onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			status: e.currentTarget.value
		})
	}

	render() {
		return (
			<div className={ s.profileInfoOverlay }>
				{ !this.state.editMode &&
					<div>
							<span onDoubleClick={this.activateEditMode}> {this.props.status || 'My status'} </span>
					</div>
				}
				{ this.state.editMode &&
					<div>
						<input autoFocus={true}
						       onBlur={this.deactivateEditMode}
						       onChange={this.onStatusChange }
						       value={ this.state.status }/>
					</div>
				}
			</div>
		)
	}
}

export default ProfileInfo