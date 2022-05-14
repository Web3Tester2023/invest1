import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import DashboardLayout from "../../../components/App/layout";
import PageHeader from "../../../components/App/PageHeader";
import BasketCard from "../../../components/BasketCard";
import CryptoSelector from "../../../components/CryptoSelector";
import TokenPriceTile from "../../../components/TokenPriceTile";
import { cryptos } from "../../../Constants/cryptos";
import {
  Button,
  Card,
  Grid,
  HStack,
  Table,
  TableBody,
  TableCol,
  TableHead,
  TableRow,
} from "../../../uikit";
const Manage = () => {
  const { chainId, account } = useMoralis();
  console.log("Chain", chainId);
  console.log("Account", account);

  const [basketCryptos, setBasketCryptos] = useState([]);
  const [investmentType, setInvestmentType] = useState("lumpsum");
  const [investmentToken, setInvestmentToken] = useState(cryptos["0x13881"][0]);
  const [investmentAmount, setInvestmentAmount] = useState(100);
  useEffect(()=>{

    console.log("basketCryptos", basketCryptos)
  },[basketCryptos])
  return (
    <DashboardLayout>
      <PageHeader
        title={
          <>
            <span>Creating </span>
            <span className="border-b border-gray-900 text-gray-800 border-dotted">
              Basket Name
            </span>
          </>
        }
      ></PageHeader>
      <Grid className="md:grid-cols-4">
        <Card className="col-span-3 p-4">
          <div className="flex items-center justify-between py-2">
            <CryptoSelector cryptos={cryptos["0x13881"]} setBasketCryptos={setBasketCryptos} selectedCryptos={basketCryptos}/>
          </div>
          <Table>
            <TableHead tableHeadings={["#", "Token", "Price", "Investment"]} />
            <TableBody>
            {
              basketCryptos.length <= 0 ?
              (
                <TableRow>
                <TableCol colspan="4">
                <div className="relative w-full cursor-default select-none py-2 px-4 text-gray-700 flex justify-center items-center">
                  No Tokens Added
                </div>
                </TableCol>
                </TableRow>
              )
              : 
              (
                basketCryptos.map((token,index)=>(
                <TableRow key={index}>
                  <TableCol>1</TableCol>
                  <TableCol>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={token.icon}
                        width="20px"
                        height="20px"
                        className="w-6 h-6"
                        alt={token.name}
                      />
                      <p>{token.name}</p>
                    </div>
                  </TableCol>
                  <TableCol>$33,339</TableCol>
                  {/* <TableCol>33%</TableCol>g */}
                  <TableCol>$230</TableCol>
                </TableRow>
              )))
            }
            </TableBody>
          </Table>
        </Card>
        <div className="flex flex-col space-y-3">
          <div className="flex rounded-lg shadow-md">
            <div
              onClick={() => setInvestmentType("lumpsum")}
              className={`${
                investmentType == "lumpsum"
                  ? "bg-indigo-600 border-indigo-700 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }  rounded-l-lg w-full p-4 flex justify-center items-center cursor-pointer`}
            >
              Lumpsum
            </div>
            <div
              onClick={() => setInvestmentType("sip")}
              className={`${
                investmentType == "sip"
                  ? "bg-indigo-600 border-indigo-700 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }  rounded-r-lg w-full p-4 flex justify-center items-center cursor-pointer`}
            >
              Monthly SIP
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <p className="text-sm uppercase text-gray-500 mb-3">
              {investmentType == "lumpsum" ? "Investment Amount" : "SIP Amount"}
            </p>
            <div className="flex items-center bg-white shadow-md rounded-lg py-4 px-2 mb-3">
              <input
                className="appearance-none text-4xl text-right bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
                type="text"
                placeholder="0.0"
                aria-label="Full name"
                required
                min={0.01}
                name="amount"
                // onChange={handleChange}
                value={investmentAmount}
              />

              <p className="flex-shrink-0 text-4xl border-transparent border-4 font-thin text-gray-500 hover:text-teal-800 py-1 px-2 rounded">
                {investmentToken.symbol}
              </p>
            </div>
            {investmentType == "lumpsum" ? (
              <Button
                title="Invest Now"
                primary={true}
                className="justify-center"
              />
            ) : (
              <Button
                title="Start Monthly SIP"
                primary={true}
                className="justify-center"
              />
            )}
          </div>
        </div>
      </Grid>
    </DashboardLayout>
  );
};

export default Manage;
