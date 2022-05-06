/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import { BiChevronDown } from 'react-icons/bi'
import { getEllipsisTxt } from '../helpers/formatters'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import {Button, ListItem} from '../uikit'
import {IoCopy} from "react-icons/io5"
import {cryptos} from "../Constants/cryptos"
import toast, { Toaster } from 'react-hot-toast'
// import { XIcon } from "react-icons/hi";

const ProfileDropdown = ({ user, account, logout }) => {
  const [open, setOpen] = useState(false)
  const { Moralis, chainId } = useMoralis()
  const [balances, setBalances] = useState([]);
  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
  const fetchTokenBalances = async () => {
    const bal = await Web3Api.account.getTokenBalances({
      chain: chainId ? chainId : "0x13881"
    });
    const balance = await Web3Api.account.getNativeBalance({
      chain: chainId ? chainId : "0x13881"
    });
    setBalances([{
      balance: balance.balance,
      decimals: "18",
      logo: cryptos[chainId ? chainId : "0x13881"][0].icon,
      name: cryptos[chainId ? chainId : "0x13881"][0].name,
      symbol: cryptos[chainId ? chainId : "0x13881"][0].symbol,
      thumbnail: null,
    }, ...bal])
    console.log("Balances",balance);
  };
  fetchTokenBalances()
},[])
  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(!open);
  }

  const copyAddress = (account) => {
    navigator.clipboard.writeText(account);
    console.log("Copy");
    toast.success("Address Copied!", {
      duration: 2000,
      position: "top-center",
    });
  };
  return (
      <>
          <div>
        <button
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 items-center space-x-1"
          onClick={openModal}
        >
          <img
            alt="profile"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            className="h-6 mx-auto object-cover rounded-full w-6"
          />

          <p className="mr-5">{getEllipsisTxt(account, 6)}</p>

          <BiChevronDown
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </button>
      </div>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      {/* <XIcon className="h-6 w-6" /> */}
                      <FaTimes/>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  {/* <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900"> Panel title </Dialog.Title>
                  </div> */}
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">

                  <div className="">
                  <div className="h-32 overflow-hidden">
                    <img
                      className="w-full"
                      src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-center px-5 -mt-12">
                    <img
                      className="h-24 w-24 bg-white p-2 rounded-full   "
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-center px-14 mb-3">
                      <h2 className="text-gray-800 text-3xl font-bold">
                        Himanshu Purohit
                      </h2>
                      <div className="flex space-x-2 justify-center mt-2 items-center">
                        <p className="text-gray-400">
                          {getEllipsisTxt(account, 8)}
                        </p>
                        <IoCopy
                          className="text-gray-400 cursor-pointer"
                          onClick={() => copyAddress(account)}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">Wallet Balances</p>
                      </div>
                      {balances.map((balance, index) => (
                        <ListItem
                          image={balance.logo ? balance.logo : require("../public/cryptos/empty-token.webp")}
                          title={balance.name}
                          subTitle={balance.symbol}
                          key={index}
                          className="max-h-16"
                          left={
                            <div className="flex flex-col items-end">
                              <p className=" font-base text-sm">
                                {parseFloat(Moralis?.Units?.FromWei(balance.balance.toString(), balance.decimals)).toFixed(6)} {balance.symbol}
                              </p>
                              
                            </div>
                          }
                        />
                      ))}
                    </div>
                    <Button
                      className="flex bottom-0 py-4 w-full mt-3 justify-center text-center"
                      onClick={logout}
                      primary
                      title="Disconnect Wallet"
                    />
                  </div>
                </div>


                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    <Toaster />

      </>
  )
}

export default ProfileDropdown;