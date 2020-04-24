import './index.css'
import './skeletoncss/normalize.css'
import './skeletoncss/skeleton.css'

import React from 'react'
import ReactDOM from 'react-dom'

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

import App from './App'
import * as serviceWorker from './serviceWorker'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
  }),
})

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<AppWithApollo />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
