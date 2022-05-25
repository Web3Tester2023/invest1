import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import WalletConnectProvider from "@walletconnect/web3-provider";
import InvestmentAbi from "../artifacts/Investment.json";
import { Addresses } from "../Constants/Addresses";
import { toast } from "react-hot-toast";
import { createClient } from "urql";
import moment from "moment";

export const InvestmentContext = React.createContext();

export const InvestmentProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [baskets, setBaskets] = useState([]);
  const { Moralis, Util, chainId, account, user, isAuthenticated, enableWeb3 } = useMoralis();
  const [isBasketCreating, setIsBasketCreating] = useState(false);
  const APIURL = "https://api.thegraph.com/subgraphs/name/hp1203/coinvest";

  const client = createClient({
    url: APIURL,
  }, );

  // let InvestmentAbi = null;
  // if (chainId == 0x3) {
  //   InvestmentAbi = InvestmentAbiEther;
  // } else if (chainId == 0x13881) {
  //   InvestmentAbi = InvestmentAbiPolygon;
  // } else {
  //   InvestmentAbi = InvestmentAbiEther;
  // }

  const getBaskets = async () => {
    setIsLoading(true);
        const query = `
          query {
              investmentBaskets (
                  first: 20
                  orderBy: created_at
                  orderDirection: desc
                  where: { owner: "${user.get('ethAddress').toString()}" }
              ) {
                id
                basketId
                name
                metadata
                investmentToken
                investmentType
                owner
                investingAccount
                total_investment
                tokens {
                  address
                  percentage
                  priceFeedAddress
                  amount
                  investedAmount
                }
                created_at
                updated_at
              }
          }
      `;
        console.log("query", query);
        const response = await client.query(query).toPromise();
        console.log("Response", response);
        if (response.data) {
          setIsLoading(false);
          setBaskets(response.data.investmentBaskets);
        }else{
          setIsLoading(false);
        }
      };

  // useEffect(() => {
  //   // console.log("Acc", user.get('ethAddress'));
  //   if (user) {
  //     getBaskets();
  //   }
  // }, [user]);

  const getIpfsData = async (metadataUrl) => {
    // await fetch(metadataUrl).then(res => res.json()).then(result => result.data).catch(console.log);
    let data;
    await axios
      .get(metadataUrl)
      .then((res) => {
        console.log("IPFS", typeof res.data);
        let metadata = JSON.stringify(res.data);
        // data = metadata.replace('ipfs://', baseIpfsUrl);
        return (data = JSON.parse(metadata));
        // return metadata;
      })
      .catch((err) => {
        return err;
      });
    return data;
  };

  const investLumpsumInBasket = async (basketId, investingToken, amount) => {
    console.log("Params", basketId, investingToken, amount)
    try {
      const provider = await Moralis.enableWeb3();
      const signer = provider.getSigner();

      const ercToken = new ethers.Contract(investingToken.address, investingToken.abi, signer);
      console.log("Contract", ercToken)
      const tx = await ercToken.approve(Addresses.INVESTMENT_ADDRESS, ethers.utils.parseEther(amount));
      setIsLoading(true);
      console.log(`Loading - ${tx.hash}`);
      await tx.wait();

      const investmentContract = new ethers.Contract(
        Addresses.INVESTMENT_ADDRESS,
        InvestmentAbi.abi,
        signer
      );

      const txHash = await investmentContract.investInBasket(
        basketId.toString(),
        ethers.utils.parseEther(amount)
      );

      console.log(`Loading - ${txHash.hash}`);
      await txHash.wait();
      setIsBasketCreating(false);
      console.log(`Success - ${txHash.hash}`);
    } catch (err) {
      setIsBasketCreating(false);
      toast.error("Something went wrong! Please try again later.", {
        duration: 4000,
        position: "top-center",
      });
      console.log(err);
    }
  }

  const createBasket = async (
    name,
    description,
    basketTokens,
    basketTokensPercentage,
    priceFeedAddresses,
    investingToken,
    investingAccount
  ) => {
    console.log(
      "Data",
      name,
      description,
      basketTokens,
      basketTokensPercentage,
      priceFeedAddresses,
      investingToken,
      investingAccount
    );
    setIsBasketCreating(true);
    const object = {
      name: name,
      description: description,
    };
    const metadata = new Moralis.File(name + "_metadata.json", {
      base64: btoa(JSON.stringify(object)),
    });
    await metadata.saveIPFS();

    try {
      const provider = await Moralis.enableWeb3();
      // if(provider) {
      // const provider = new ethers.providers.Web3Provider(web3Provider);
      const signer = provider.getSigner();
      // const provider = getProviderOrSigner();
      // console.log("signer", walletConnected)
      const investmentContract = new ethers.Contract(
        Addresses.INVESTMENT_ADDRESS,
        InvestmentAbi.abi,
        signer
      );

      const txHash = await investmentContract.createBasket(
        name.toString(),
        metadata.ipfs(),
        basketTokens,
        basketTokensPercentage,
        priceFeedAddresses,
        investingToken.toString(),
        investingAccount.accountAddress.toString()
      );

      console.log(`Loading - ${txHash.hash}`);
      await txHash.wait();
      setIsBasketCreating(false);
      console.log(`Success - ${txHash.hash}`);
      getBaskets();
    } catch (err) {
      setIsBasketCreating(false);
      toast.error("Something went wrong! Please try again later.", {
        duration: 4000,
        position: "top-center",
      });
      console.log(err);
    }
  };

  return (
    <InvestmentContext.Provider
      value={{
        isLoading,
        isBasketCreating,
        getIpfsData,
        setIsBasketCreating,
        createBasket,
        baskets,
        investLumpsumInBasket,
        getBaskets
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};
