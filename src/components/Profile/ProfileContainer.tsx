import React from 'react'
import Profile from "./Profile"
import {connect} from "react-redux"
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router-dom"
import {compose} from "redux"
import {AllAppTypes} from "../../redux/redux-store"
import {ProfileType} from "../../Types/Types"

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
  userId: string
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
      super(props);
    }

    refreshProfile() {
      let userId: number | null = +this.props.match.params.userId;
      if (!userId) {
        userId = this.props.authorizedUserId;
        if (!userId) {
          // todo: may be replace push with Redirect??
          this.props.history.push("/login");
        }
      }

      if (!userId) {
        console.error("ID should exists in URI params or in state ('authorizedUserId')");
      } else {
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
      }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state: AllAppTypes) => {
    return ({
        profile: state.ProfilePage.profile,
        status: state.ProfilePage.status,
        authorizedUserId: state.Auth.userId,
        isAuth: state.Auth.isAuth
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile, getStatus,
        updateStatus, savePhoto, saveProfile
    }), withRouter
)(ProfileContainer);