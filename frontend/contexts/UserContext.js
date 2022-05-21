import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import WalletConnectProvider from "@walletconnect/web3-provider";
import UsersABI from "../artifacts/Users.json";
import { Addresses } from "../Constants/Addresses";
import { toast } from "react-hot-toast";
import { createClient } from "urql";
import moment from "moment";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAccountCreating, setIsAccountCreating] = useState(false);
    const [investingAccount, setInvestingAccount] = useState(null);
    const { Moralis, Util, chainId, account, user, isAuthenticated, enableWeb3 } = useMoralis();

    const APIURL = "https://api.thegraph.com/subgraphs/name/hp1203/coinvest";

    const client = createClient({
        url: APIURL,
    }, );

    const getInvestingAccount = async () => {
        setIsLoading(true)
        const query = `
            query {
                investingAccounts(
                    where: { owner: "${user.get('ethAddress').toString()}" }
                ) {
                    id
                    username
                    owner
                    accountAddress
                    nftAddress
                    nftId
                }
            }
        `;
        const response = await client.query(query).toPromise();
        console.log("Response", response);
        if (response.data) {
          setIsLoading(false);
          setInvestingAccount(response.data.investingAccounts[0]);
        }else{
          setIsLoading(false);
          toast.error("Something went wrong! Please try again later.", {
            duration: 4000,
            position: "top-center",
          });
        }
    }
    useEffect(()=>{
        if(user !== null){
            getInvestingAccount();
        }
    },[user]);


    useEffect(()=>{
        if(isAuthenticated){
          enableWeb3()
        }
      },[])
    

    const createInvestingAccount = async (name, username) => {
        setIsAccountCreating(true);

        const object = {
            name: name,
            username: username,
            image: "https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
        }
        const metadata = new Moralis.File(username + "_metadata.json", {
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
            const usersContract = new ethers.Contract(
              Addresses.USERS_ADDRESS,
              UsersABI.abi,
              signer
            );
      
            const txHash = await usersContract.createAccount(
              metadata.ipfs(),
              username
            );
      
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();
            setIsAccountCreating(false);
            console.log(`Success - ${txHash.hash}`);
            getInvestingAccount()
          } catch (err) {
            setIsAccountCreating(false);
            toast.error("Something went wrong! Please try again later.", {
              duration: 4000,
              position: "top-center",
            });
            console.log(err);
          }
    }
    return (
        <UserContext.Provider value={{
            isLoading,
            investingAccount,
            createInvestingAccount,
            isAccountCreating
        }}>
            {children}
        </UserContext.Provider>
    )
}