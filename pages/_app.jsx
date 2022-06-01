import '../styles/globals.css'
import 'animate.css'
import { App } from 'konsta/react'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
function lib(provider) {
  return new Web3(provider)
}
export default function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={lib}>
      <App theme='material' safeAreas dark>
        <Component {...pageProps} />
      </App>
    </Web3ReactProvider>
  )
}