import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'

import { updateUserMutation, getJustUser } from 'requests'
import UserContext from 'context/UserContext'
import { InputField } from 'common'
import { useAlert } from 'hooks'

const Home = () => {
  const currentUser = useContext(UserContext)
  const [updateUser] = useMutation(updateUserMutation, {
    refetchQueries: { getJustUser },
  })

  return (
    <>
      {currentUser && (
        <div className="profile-page">
          <h2 className="page-title">Your Profile</h2>

          <div className="card content">
            <img
              src={currentUser.avatar}
              alt={currentUser.firstName}
              className="profile-img"
            />

            <div className="form">
              <Formik
                initialValues={{
                  id: currentUser.id,
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName,
                  email: currentUser.email,
                  ssn: currentUser.ssn,
                  address: currentUser.address,
                }}
                onSubmit={async (res, { setSubmitting }) => {
                  setSubmitting(true)
                  await updateUser({ variables: res })
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <InputField
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      error={touched.firstName && errors.firstName ? 1 : 0}
                    />
                    <InputField
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      error={touched.lastName && errors.lastName ? 1 : 0}
                    />
                    <InputField
                      type="email"
                      id="email"
                      name="email"
                      label="Email"
                      error={touched.email && errors.email ? 1 : 0}
                    />
                    <InputField
                      id="ssn"
                      name="ssn"
                      label="SSN"
                      error={touched.ssn && errors.ssn ? 1 : 0}
                    />
                    <InputField
                      id="address"
                      name="address"
                      label="Address"
                      error={touched.address && errors.address ? 1 : 0}
                    />

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={errors.length || isSubmitting}
                    >
                      Update Profile
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
