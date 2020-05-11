/* eslint-disable no-shadow */
import React from 'react'

import { Loader } from 'common'

const QueryResponse = ({ error, loading }) => {
  if (loading) {
    return <Loader />
  }

  if (!error || !error.message) return null

  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i}>
        <p>
          <strong>Shoot! </strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ))
  }

  return (
    <div>
      <p>
        <strong>Shoot! </strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  )
}

export default QueryResponse
