import React from 'react'
import { useMoralis } from 'react-moralis'
import DashboardLayout from '../../../components/App/layout'
import PageHeader from '../../../components/App/PageHeader'
import BasketCard from '../../../components/BasketCard'
import TokenPriceTile from '../../../components/TokenPriceTile'
import { cryptos } from '../../../Constants/cryptos'
import { Card, Grid, HStack } from "../../../uikit"
const Home = () => {
  const { chainId, account } = useMoralis();
  console.log("Chain", chainId)
  console.log("Account", account)
  return (
    <DashboardLayout>
    <PageHeader title="Investments"></PageHeader>
      <HStack className="space-x-4 overflow-x-scroll p-2 scroll-smooth" space={4}>
      {
        cryptos[chainId ? chainId : "0x13881"].map((token, index)=> (
          <TokenPriceTile key={index} token={token}/>
        ))
      }
      </HStack>
      <Grid cols={4} className="md:grid-cols-4 mt-5">
        <BasketCard/>
        <BasketCard/><BasketCard/><BasketCard/><BasketCard/><BasketCard/><BasketCard/>
      </Grid>

    </DashboardLayout>
  )
}

export default Home