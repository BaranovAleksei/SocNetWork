import {Field, Form, Formik} from 'formik'
import React from 'react'
import {FilterType} from '../../redux/users-reducer'
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";

type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
  term: string
  friend: FriendFormType
}

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

  const filter = useSelector(getUsersFilter)

  const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }

    props.onFilterChanged(filter)
    setSubmitting(false)
  }

  return <div>
    <Formik
      enableReinitialize={true}
      initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
      validate={usersSearchFormValidate}
      onSubmit={submit}
    >
      {({isSubmitting}) => (
        <Form>
          <Field type="text" name="term"/>

          <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only friends</option>
            <option value="false">Only no friends</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
      )}
    </Formik>
  </div>
})