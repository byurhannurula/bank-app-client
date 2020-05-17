import withApollo from 'next-with-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

if (!process.browser) {
  global.fetch = fetch
}

export default withApollo(({ initialState, headers }) => {
  const isBrowser = typeof window !== 'undefined'
  const backendUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:2000'
      : 'https://bank-api.bbn.codes'

  const httpLink = createHttpLink({
    uri: `${backendUrl}/graphql`,
    credentials: 'include',
    headers: {
      ...headers,
      Cookie: headers?.cookie || '',
    },
  })

  return new ApolloClient({
    credentials: 'include',
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {}),
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers: {
          ...headers,
          Cookie: headers?.cookie || '',
        },
      })
    },
  })
})
