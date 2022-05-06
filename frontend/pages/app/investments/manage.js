import React from 'react'
import { useMoralis } from 'react-moralis'
import DashboardLayout from '../../../components/App/layout'
import PageHeader from '../../../components/App/PageHeader'
import BasketCard from '../../../components/BasketCard'
import TokenPriceTile from '../../../components/TokenPriceTile'
import { cryptos } from '../../../Constants/cryptos'
import { Card, Grid, HStack, Table, TableHead } from "../../../uikit"
const Manage = () => {
  const { chainId, account } = useMoralis();
  console.log("Chain", chainId)
  console.log("Account", account)
  return (
    <DashboardLayout>
        <PageHeader title={<><span>Creating </span><span className="border-b border-gray-900 text-gray-800 border-dotted">Basket Name</span></>}></PageHeader>      
        <Grid className="md:grid-cols-4">
            <Card className="col-span-3 p-5">
            <Table>
                <TableHead tableHeadings={["#","Token","Price","Weight","Investment"]}/>
                
            </Table>
            </Card>
        </Grid>
    </DashboardLayout>
  )
}

export default Manage