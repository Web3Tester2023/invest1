import Image from "next/image";
import React from "react";
import { Button, Card } from "../uikit";
import { cryptos } from "../Constants/cryptos";
import { useMoralis } from "react-moralis";
import { FaDotCircle } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsArrowUpShort } from "react-icons/bs"
import Link from "next/link";
const BasketCard = ({basket}) => {
  const { chainId } = useMoralis();
  const investingToken = cryptos[chainId ? chainId : "0x13881"].find((crypto) => crypto.address.toLowerCase() == basket.investmentToken.toLowerCase())
  let basketTokens = []
  basket.tokens.map((token, i) => {
  const basketToken = cryptos[chainId ? chainId : "0x13881"].find((crypto) => crypto.address.toLowerCase() == token.address.toLowerCase());
            console.log("tok", basketToken)
    basketTokens.push(basketToken)
  });
  console.log("Investment TOken", investingToken)
  return (
    <Card className="p-5 space-y-2">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <Image
            src={investingToken.icon}
            alt={investingToken.name}
            width="60px"
            height="60px"
            objectFit="contain"
            className="mr-2 rounded-full"
          />
          <div className="flex flex-col w-full">
            <p className="font-semibold text-lg">{basket.name}</p>
            <p className="text-gray-400">{investingToken.symbol}</p>
          </div>
        </div>
        <div>
          {/* <Button title="Manage" leftIcon={<HiOutlineDotsVertical/>} className="justify-center"/> */}
          <Link passHref href={{
            pathname: "/app/investments/manage/[id]",
            query: {
              id: basket.id,
            }
          }}>
            <HiOutlineDotsVertical className="text-xl cursor-pointer"/>
          </Link>
        </div>
      </div>
      <div className="flex justify-center -space-x-2 p-2 overflow-hidden">   
        {
          basketTokens.map((token, i) => {
          if(token){
            return (
              <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white relative" key={i}>   
              <Image
                  src={token.icon}
                  alt={token.name}
                  layout="fill"
                  width="24px"
                  height="24px"
                  objectFit="cover"
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                />
              </div>
            )
          }
          })
        } 
          
          {/* <div className="inline-block h-10 w-10 rounded-full ring-2 jus ring-white relative bg-gray-200 text-gray-700 flex justify-center items-center"><span>+3</span></div> */}
      </div>
      <div className="flex flex-col justify-center items-center p-3 border-b border-gray-50">
        <div className="flex justify-center items-center py-1 px-2 rounded-full bg-green-200 text-green-600 mb-2">
          <p className="text-xs">+$34,500</p>
          <BsArrowUpShort/>
          {/* <p className="text-xs text-gray-400">Unrealised P&L</p> */}
        </div>
        <p className="text-xl font-semibold">{basket.total_investment}</p>
        <p className="text-xs text-gray-400">Investment ({investingToken.symbol})</p>
      </div>
      
      <Button title="Invest Now" className="justify-center" primary/>
    </Card>
  );
};

export default BasketCard;
