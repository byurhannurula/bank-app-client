import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useMutation } from '@apollo/react-hooks'

import UserContext from 'context/UserContext'
import { SelectField, accountSchema, Loader } from 'common'
import { createAccountMutation } from 'requests'

import { accountTypes, currencies } from './data'

export const AccountModal = ({ closeModal }) => {
  const currentUser = useContext(UserContext)
  const [createAccount, { data, error, loading }] = useMutation(
    createAccountMutation,
  )

  return (
    <Formik
      initialValues={{ accountType: '', currency: '' }}
      validationSchema={accountSchema}
      onSubmit={async (res, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        await createAccount({ variables: { owner: currentUser.id, ...res } })
        resetForm()
      }}
    >
      {({ touched, errors, isValid, isSubmitting }) => (
        <Form>
          {error && <p>{error.message}</p>}
          {loading && <Loader />}
          {data?.createAccount?.id && closeModal()}
          <div className="column">
            <SelectField
              id="accountType"
              name="accountType"
              label="Select Account Type"
              error={touched.accountType && errors.accountType ? 1 : 0}
            >
              <option value="" disabled>
                Please select account type
              </option>
              {accountTypes.map((accType) => (
                <option value={accType.name} key={accType.id}>
                  {accType.name}
                </option>
              ))}
            </SelectField>

            <SelectField
              id="currency"
              name="currency"
              label="Select Currency"
              error={touched.currency && errors.currency ? 1 : 0}
            >
              <option value="" disabled>
                Please select currency
              </option>
              {currencies.map((curr) => (
                <option value={curr.name} key={curr.id}>
                  {curr.name}
                </option>
              ))}
            </SelectField>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || isSubmitting}
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  )
}
