import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import { Card } from '../uikit'
import { getUsdPrice } from "../hooks/useChainlink";
const TokenPriceTile = ({ token }) => {
const [usdPrice, setUsdPrice] = useState(0.00);
const [change, setChange] = useState(0.00);
useEffect(() => {
    getUsdPrice(token.priceAddress).then(data => {
        if(usdPrice <= 0){
            setChange(0.00);
        }else{
            setChange(data - usdPrice);
        }
        setUsdPrice(data);
    })
    setInterval(() => {
    getUsdPrice(token.priceAddress).then(data => {
        if(usdPrice <= 0){
            setChange(0.00);
        }else{
            setChange(data - usdPrice);
        }
        setUsdPrice(data);
    })
    },60000)
}, [])

  return (
    <Card className="w-full p-4 min-w-[280px]">
        <div className='flex items-center justify-between'>
            <div className='flex space-x-2 items-center'>
            <Image alt={token.name} src={token.icon} width="40px" height="40px" objectFit="contain"/>
            <div className='flex flex-col'>
                <h1 className='font-semibold text-xs text-gray-800'>{token.name}</h1>
                <p className='text-gray-400 text-sm'>{token.symbol}/USD</p>
            </div>
            </div>
            <div className='flex flex-col items-end'>
            <p className='text-gray-800 font-semibold'>${parseFloat(usdPrice).toFixed(2)}</p>
            <p className={`${change >= 0 ? 'text-green-600' : 'text-red-600' } text-sm`}>{`${change >= 0 ? '+' : '-' }$${parseFloat(change).toFixed(4)}`}</p>
            </div>
        </div>
    </Card>
  )
}

export default TokenPriceTile