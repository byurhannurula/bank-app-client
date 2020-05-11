import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { AccountCard } from 'common'
import { getAccounts } from 'requests'

const Accounts = () => {
  const { error, loading, data, networkStatus } = useQuery(getAccounts, {
    notifyOnNetworkStatusChange: true,
  })

  const accounts = data && data.me.accounts
  if (networkStatus === 4) console.log('Refetching!')

  return (
    <div className="accounts-page">
      <h2 className="page-title">My Accounts</h2>
      {error && <p>{error.message}</p>}
      {loading && <p>Loading...</p>}
      <div className="accounts">
        {!error && !loading && accounts.length > 0 ? (
          accounts?.map((acc) => <AccountCard key={acc.id} node={acc} />)
        ) : (
          <p>You don&rsquo;t have any account yet!</p>
        )}
      </div>
    </div>
  )
}

export default Accounts
