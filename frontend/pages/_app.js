import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl='https://klwdwr4f0lfr.usemoralis.com:2053/server' appId='wbTJI520ItjZLUl5L7fzjpaeVyHSzFoVtyDc6aay'>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
