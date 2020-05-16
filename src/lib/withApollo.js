import withApollo from 'next-with-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'

export default withApollo(({ initialState, headers }) => {
  const isBrowser = typeof window !== 'undefined'

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: createHttpLink({
      uri:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:2000/graphql'
          : 'https://bank-api.bbn.codes/graphql',
      credentials: 'include',
      ...(!isBrowser && { fetch }),
      headers: {
        ...headers,
        cookie: headers?.cookie,
      },
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  })
})
