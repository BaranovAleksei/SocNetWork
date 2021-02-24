import React, {ChangeEvent, useEffect, useState} from 'react'
import s from "./Profile.module.sass"

type ProfileInfoType = {
	status: string
	updateStatus: (status: string) => void
}

const ProfileInfoHooks:React.FC <ProfileInfoType> = (props) => {

	let [editMode, setEditMode] = useState(false)
	let [status, setStatus] = useState(props.status)

	useEffect( () => {
		setStatus(props.status)
	},[props.status])

	const activateEditMode = () => {
		setEditMode(true)
	}
	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}
	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}

	return (
		<div className={ s.profileInfoOverlay }>
			{ !editMode &&
				<div>
					<span onDoubleClick={ activateEditMode }> {props.status || 'My status'} </span>
				</div>
			}
			{ editMode &&
				<div>
            <input onChange = {onStatusChange}
                   autoFocus = {true}
                   onBlur = {deactivateEditMode}
                   value = {status}
            />
				</div>
			}
		</div>
	)
}

export default ProfileInfoHooks