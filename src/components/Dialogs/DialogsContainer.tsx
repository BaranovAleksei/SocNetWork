import React  from 'react'
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import { AllAppTypes } from '../../redux/redux-store'
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import { compose } from 'redux'
import {actions} from "../../redux/dialogs-reducer";

let mapStateToProps = (state: AllAppTypes) => {
  return {
    dialogsPage: state.DialogsPage
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs)
