import Image from "next/image";
import React from "react";
import { Button, Card } from "../../uikit";
import { cryptos } from "../../Constants/cryptos";
import { useMoralis } from "react-moralis";
import { FaDotCircle } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsArrowUpShort } from "react-icons/bs"
import Link from "next/link";
const CryptoCard = ({token, isSelected, onClick}) => {
  const { chainId } = useMoralis();
  return (
    <div className={`border-2 w-[120px] shadow-md rounded-lg  mb-2 mr-2 ${isSelected ? "border-indigo-600 shadow-indigo-400" : ""}`} onClick={onClick}>
    <Card className={`p-2 shadow-none overflow-hidden cursor-pointer h-[120px] text-center `}>
      
      {/* <div className="flex justify-center -space-x-2 p-2 overflow-hidden">    
        <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white relative">   
        <Image
            src={token.icon}
            alt={token.name}
            layout="fill"
            objectFit="cover"
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          />
          </div>
      </div> */}
      <div className="flex flex-col justify-center items-center border-gray-50 ">
      <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white relative mb-2">   
      <Image
            src={token.icon}
            alt={token.name}
            layout="fill"
            objectFit="cover"
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          />
          </div>
        <p className="text-xs font-semibold">{token.name}</p>
        {/* <p className="text-xs text-gray-400">Investment (USDT)</p> */}
        <input type="checkbox" className="" onChange={onClick}>
        <p className="text-xs font-semibold">{token.name}</p>
        </input>
      </div>
      
    </Card>
    </div>
  );
};

export default CryptoCard
;
