/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import { BiChevronDown } from 'react-icons/bi'
import { getEllipsisTxt } from '../helpers/formatters'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
// import { XIcon } from "react-icons/hi";

const ProfileDropdown = ({ user, account, logout }) => {
  const [open, setOpen] = useState(true)
  const { Moralis } = useMoralis()
  const [balances, setBalances] = useState([]);
  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
  const fetchTokenBalances = async () => {
    const bal = await Web3Api.account.getTokenBalances({
      chain:"0x3"
    });
    const balance = await Web3Api.account.getNativeBalance({
      chain:"0x3"
    });
    setBalances([{
      balance: balance.balance,
      decimals: "18",
      logo: require("../public/cryptos/eth.png"),
      name: "Ethereum",
      symbol: "ETH",
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
    setOpen(true);
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
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900"> Panel title </Dialog.Title>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">

                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                    </div>

                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
      </>
  )
}

export default ProfileDropdown;