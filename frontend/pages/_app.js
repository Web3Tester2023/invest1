import { MoralisProvider, useMoralis } from 'react-moralis'
import { useEffect } from 'react'
import '../styles/globals.css'
import { InvestmentProvider } from '../contexts/InvestmentContext';
import { UserProvider } from '../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  
  return (
    <MoralisProvider serverUrl='https://klwdwr4f0lfr.usemoralis.com:2053/server' appId='wbTJI520ItjZLUl5L7fzjpaeVyHSzFoVtyDc6aay'>
      <UserProvider>
        <InvestmentProvider>
          <Component {...pageProps} />
        </InvestmentProvider>
      </UserProvider>
    </MoralisProvider>
  )
}

export default MyApp
