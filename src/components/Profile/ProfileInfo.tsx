import React from 'react'
import s from "./Profile.module.sass"

class ProfileInfo extends React.Component<any, any> {

	state = {
		editMode: true,
		title: ''
	}

	activateEditMode() {
		this.setState({
			editMode: true
		})
	}
	deactivateEditMode() {
		this.setState({
			editMode: false
		})
	}


	render() {
		return (
			<div className={ s.profileInfoOverlay }>
				{ !this.state.editMode &&
					<div>
							<span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
					</div>
				}
				{ this.state.editMode &&
					<div>
						<input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={ this.props.status }/>
					</div>
				}
			</div>
		)
	}
}

export default ProfileInfo