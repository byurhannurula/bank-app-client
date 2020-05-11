import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Loader, TransactionCard } from 'common'
import { getPayments } from 'requests'

const Transactions = () => {
  const { error, loading, data } = useQuery(getPayments)

  const payments = data && data.me.payments

  return (
    <div className="payments-page">
      <h2 className="page-title">My Transactions</h2>
      {error && <p>{error.message}</p>}
      {loading && <Loader />}
      <div className="payments">
        {!error && !loading && payments.length > 0 ? (
          payments.map((node) => <TransactionCard key={node.id} node={node} />)
        ) : (
          <p style={{ textAlign: 'center' }}>
            You don&rsquo;t have any transaction yet!
          </p>
        )}
      </div>
    </div>
  )
}

export default Transactions
