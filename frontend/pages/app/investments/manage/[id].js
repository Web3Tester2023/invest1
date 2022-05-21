import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { useMoralis } from "react-moralis";
import CreateBasket from "../../../../components/App/CreateBasket";
import DashboardLayout from "../../../../components/App/layout";
import PageHeader from "../../../../components/App/PageHeader";
import BasketCard from "../../../../components/BasketCard";
import CryptoSelector from "../../../../components/CryptoSelector";
import TokenPriceTile from "../../../../components/TokenPriceTile";
import { cryptos } from "../../../../Constants/cryptos";
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
} from "../../../../uikit";
import { createClient } from "urql";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { InvestmentContext } from "../../../../contexts/InvestmentContext";
const Manage = () => {
  const { chainId, account } = useMoralis();
  const router = useRouter();
  const { id } = router.query;
  console.log("Context",router.query)
  // const {} = context.query
  const { investLumpsumInBasket } = useContext(InvestmentContext);
  const [isLoading, setIsLoading] = useState(false);
  const [basketCryptos, setBasketCryptos] = useState([]);
  const [investmentType, setInvestmentType] = useState("lumpsum");
  const [investmentToken, setInvestmentToken] = useState(cryptos["0x13881"][0]);
  const [investmentAmount, setInvestmentAmount] = useState(100);
  const [basket, setBasket] = useState(null);
  useEffect(() => {
    console.log("basketCryptos", basketCryptos);
  }, [basketCryptos]);

  const APIURL = "https://api.thegraph.com/subgraphs/name/hp1203/coinvest";

  const client = createClient({
    url: APIURL,
  });

  useEffect(() => {
    // console.log("Acc", user.get('ethAddress'));
    const fetchData = async () => {
      setIsLoading(true);
      const query = `
          query {
              investmentBasket (
                   id: "${id}" 
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
      // console.log("query", query);
      const response = await client.query(query).toPromise();
      console.log("Response", response);
      if (response.data) {
        var invBasket = await response.data.investmentBasket;
        console.log("invBasket", invBasket)

        if(invBasket){
          const investingToken = cryptos[chainId ? chainId : "0x13881"].find((crypto) => crypto.address.toLowerCase() == invBasket.investmentToken.toLowerCase())
          console.log("investingToken", investingToken)
          
          var basketTokens = [];
          invBasket.tokens.map((token, i) => {
            const basketToken = cryptos[chainId ? chainId : "0x13881"].find((crypto) => crypto.address.toLowerCase() == token.address.toLowerCase());
            console.log("tok", basketToken)
            basketTokens.push({...basketToken, ...token})
          });
          
          setInvestmentToken(investingToken);
          setBasketCryptos(basketTokens);
        }
        setBasket(invBasket);
        setIsLoading(false);

      } else {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  // if(isLoading){
  //   return (
  //     <div className="flex w-full h-screen justify-center items-center">
  //       <AiOutlineLoading3Quarters/>
  //     </div>
  //   )
  // }
  return (
    <DashboardLayout>
      <PageHeader
        title={
          <>
            <span>Creating </span>
            <span className="border-b border-gray-900 text-gray-800 border-dotted">
              {isLoading || basket == null ? "" : basket.name}
            </span>
          </>
        }
      >
        {/* <CreateBasket/> */}
      </PageHeader>
      {isLoading || basket == null || investmentAmount == null  || basketCryptos.length < 0 ? (
        <div className="flex flex-col space-y-2 w-full h-screen justify-center items-center">
          <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
          <p>Loading, Please wait!</p>
        </div>
      ) : (
        <Grid className="md:grid-cols-4">
          <Card className="col-span-3 p-4">
            {/* <div className="flex items-center justify-between py-2">
            <CryptoSelector cryptos={cryptos["0x13881"]} setBasketCryptos={setBasketCryptos} selectedCryptos={basketCryptos}/>
          </div> */}
            <Table>
              <TableHead
                tableHeadings={["#", "Token", "Investment", "Weight"]}
              />
              <TableBody>
                {basketCryptos.length <= 0 ? (
                  <TableRow>
                    <TableCol colspan="4">
                      <div className="relative w-full cursor-default select-none py-2 px-4 text-gray-700 flex justify-center items-center">
                        No Tokens Added
                      </div>
                    </TableCol>
                  </TableRow>
                ) : (
                  basketCryptos.map((token, index) => (
                    <TableRow key={index}>
                      <TableCol>{index+1}</TableCol>
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
                      {/* <TableCol>$33,339</TableCol> */}
                      <TableCol>{token.percentage/10}%</TableCol>
                      <TableCol>{token.amount} {investmentToken.symbol}</TableCol>
                    </TableRow>
                  ))
                )}
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
                {investmentType == "lumpsum"
                  ? "Investment Amount"
                  : "SIP Amount"}
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
                  onChange={(e) => setInvestmentAmount(e.target.value)}
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
                  onClick={() => investLumpsumInBasket(basket.basketId, investmentToken, investmentAmount)}
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
      )}
    </DashboardLayout>
  );
};

export default Manage;
