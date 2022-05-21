import React, { useContext, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useMoralis } from "react-moralis";
import CreateBasket from "../../../components/App/CreateBasket";
import DashboardLayout from "../../../components/App/layout";
import PageHeader from "../../../components/App/PageHeader";
import BasketCard from "../../../components/BasketCard";
import TokenPriceTile from "../../../components/TokenPriceTile";
import { cryptos } from "../../../Constants/cryptos";
import { InvestmentContext } from "../../../contexts/InvestmentContext";
import { Card, Grid, HStack } from "../../../uikit";
const Home = () => {
  const { chainId, account, user } = useMoralis();
  const { isLoading, baskets, getBaskets } = useContext(InvestmentContext);
  useEffect(() => {
    if (user !== null) {
      getBaskets();
    }
  }, [user]);
  console.log("Baskets", baskets);
  console.log("Chain", chainId);
  console.log("Account", account);
  return (
    <DashboardLayout>
      <PageHeader title="Investments">
        <CreateBasket />
      </PageHeader>
      
      <HStack
        className="space-x-4 overflow-x-scroll p-2 scroll-smooth"
        space={4}
      >
        {cryptos[chainId ? chainId : "0x13881"].map((token, index) => (
          <TokenPriceTile key={index} token={token} />
        ))}
      </HStack>
      {
        isLoading &&(
          <div className="flex flex-col space-y-2 w-full h-screen justify-center items-center">
            <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
            <p>Loading, Please wait!</p>
          </div>
        )
      }
      <Grid cols={4} className="md:grid-cols-4 mt-5">
        {!isLoading && (
          baskets.map((basket, index) => (
            <BasketCard basket={basket} key={index} />
          ))
        )}
        {/* <BasketCard/><BasketCard/><BasketCard/><BasketCard/><BasketCard/><BasketCard/> */}
      </Grid>
    </DashboardLayout>
  );
};

export default Home;
