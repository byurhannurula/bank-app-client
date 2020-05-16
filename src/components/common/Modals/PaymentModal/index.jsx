import React from 'react'
import { Formik, Form } from 'formik'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { getAccounts, makePaymentMutation } from 'requests'
import { formatMoney } from 'util/index'
import { Loader, InputField, SelectField, paymentSchema } from 'common'

export const PaymentModal = ({ closeModal }) => {
  const { loading, data } = useQuery(getAccounts)
  const [makePayment, { data: paymentData, error }] = useMutation(
    makePaymentMutation,
    {
      refetchQueries: [{ query: getAccounts }],
      awaitRefetchQueries: true,
    },
  )

  if (loading) {
    return null
  }

  const accounts = data && data.me.accounts

  return (
    <Formik
      validateOnChange
      validationSchema={paymentSchema}
      initialValues={{
        IBAN_sender: '',
        IBAN_beneficiary: '',
        reason: '',
        value: 0,
      }}
      onSubmit={async (res, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        await makePayment({ variables: res })
        resetForm()
        closeModal()
      }}
    >
      {({ touched, errors, isValid, isSubmitting }) => (
        <Form>
          {error && <p>{error.message}</p>}
          {loading && <Loader />}
          <div className="column">
            <SelectField
              id="IBAN_sender"
              name="IBAN_sender"
              label="Select Account"
              error={touched.IBAN_sender && errors.IBAN_sender ? 1 : 0}
            >
              <option value="" disabled>
                Please select account
              </option>
              {accounts?.map((acc) => (
                <option value={acc.IBAN} key={acc.id}>
                  {acc.accountType}, {formatMoney(acc.balance)} {acc.currency}
                </option>
              ))}
            </SelectField>
            <InputField
              type="text"
              id="IBAN_beneficiary"
              name="IBAN_beneficiary"
              label="Beneficiary IBAN"
              placeholder="IBAN number of beneficiary"
              error={
                touched.IBAN_beneficiary && errors.IBAN_beneficiary ? 1 : 0
              }
            />
            <InputField
              type="text"
              id="reason"
              name="reason"
              label="Transfer Reason"
              placeholder="Transfer reason..."
              error={touched.reason && errors.reason ? 1 : 0}
            />
            <InputField
              type="number"
              id="value"
              name="value"
              label="Amount"
              placeholder="10.25"
              error={touched.value && errors.value ? 1 : 0}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || isSubmitting}
          >
            Send
          </button>
        </Form>
      )}
    </Formik>
  )
}
