import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext, useEffect } from "react";
import {
  IoCheckbox,
  IoCheckmark,
  IoCheckmarkCircle,
  IoClose,
  IoSearch,
} from "react-icons/io5";
import { Button, Input, ListItem, Textarea } from "../../uikit";
import { cryptos } from "../../Constants/cryptos";
import { useMoralis } from "react-moralis";
import CryptoCard from "./CryptoCard";
import CryptoDropdown from "../CryptoDropdown";
import { InvestmentContext } from "../../contexts/InvestmentContext";
import { UserContext } from "../../contexts/UserContext";
import CreateInvestingAccount from "./CreateInvestingAccount";
import Image from "next/image";

const CreateBasket = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [basketName, setBasketName] = useState("");
  const [basketDescription, setBasketDescription] = useState("");
  const [basketTokens, setBasketTokens] = useState([]);
  const [basketTokensPercentage, setBasketTokensPercentage] = useState([]);
  const [priceFeedAddresses, setPriceFeedAddresses] = useState([]);
  const { chainId, Moralis, account } = useMoralis();
  const [selected, setSelected] = useState(cryptos["0x13881"][0]);
  const [isLoading, setIsLoading] = useState(false);
  const { isBasketCreating, createBasket } = useContext(InvestmentContext);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const { investingAccount,
    createInvestingAccount, isAccountCreating } = useContext(UserContext)
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    console.log(cryptos);
    setIsOpen(true);
  }
  function openCreateAccountModal() {
    setIsCreateAccountOpen(true)
  }
  function closeCreateAccountModal() {
    setIsCreateAccountOpen(false)
  }
  const addOrRemove = (token) => {
      // alert(token)
    var tokens = basketTokens;
    var priceFeeds = priceFeedAddresses;
    var index = tokens.indexOf(token.address);
    if (index === -1) {
      tokens.push(token.address);
    } else {
      tokens.splice(index, 1);
    }
    setBasketTokens(tokens);

    var feedIndex = tokens.indexOf(token.priceAddress);
    if (feedIndex === -1) {
      priceFeeds.push(token.priceAddress);
    } else {
      priceFeeds.splice(index, 1);
    }
    setPriceFeedAddresses(priceFeeds);

  };

  
  useEffect(() => {
    const calculatePercentage = () => {
      let arr = [];
      const percentage = parseInt(1000 / basketTokens.length);
      for(let i = 0; i < basketTokens.length; i++){
        arr.push(percentage);
      }
      setBasketTokensPercentage(arr);
    }
    calculatePercentage()
    console.log("percen", basketTokensPercentage)
    
  }, [basketTokens.length])
  

  const handleCreateBasket = async () => {
    createBasket(basketName, basketDescription, basketTokens, basketTokensPercentage, priceFeedAddresses, selected.address, investingAccount)
  }
  return (
    <>
      <Button
        title="Create New Basket"
        primary
        className="justify-center max-w-[200px]"
        onClick={investingAccount == null ? openCreateAccountModal : openModal }
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900 border-b border-gray-50 pb-3 mb-4"
                  >
                    <p>Create Basket</p>
                    <button type="button" className="" onClick={closeModal}>
                      <IoClose />
                    </button>
                  </Dialog.Title>
                  <Input
                    name="basketName"
                    label="Basket Name"
                    placeholder="Give your basket a name"
                    onChange={(e) => setBasketName(e.target.value)}
                    rightIcon={<IoSearch className="text-lg  text-gray-600" />}
                  />
                  <Textarea
                    name="basketDescription"
                    label="Description"
                    onChange={(e) => setBasketDescription(e.target.value)}
                    placeholder="Describe your investment goals"
                  />
                  <div className="flex flex-col space-y-1 mt-2 mb-3">
                    <label className="font-medium text-gray-600">
                      Select tokens to invest
                    </label>
                    <CryptoDropdown selected={selected} setSelected={setSelected}/>
                  </div>
                  <div className="flex flex-col space-y-1 mt-2 mb-3">
                    <label className="font-medium text-gray-600">
                      Add tokens in basket
                    </label>
                    <div className="flex flex-col mt-2">
                      {cryptos[chainId ? chainId : "0x13881"].map(
                        (crypto, index) => (
                          <>
                          {/* <CryptoCard
                            key={index}
                            token={crypto} 
                            onClick={() => addOrRemove(crypto.address)}
                            isSelected = {
                              basketTokens.includes(crypto.address) ? true : false
                            }
                          /> */}
                          {
                            selected.address !== crypto.address &&
                            <ListItem key={index} title={crypto.name} subTitle={crypto.symbol} image={crypto.icon} left={<input className="rounded-md" type="checkbox" onChange={() => addOrRemove(crypto)}/>}/>
                          }
                          </>
                        )
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      loading={isBasketCreating}
                      title="Create"
                      primary
                      onClick={handleCreateBasket}
                      className="justify-center float-right max-w-[120px]"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isCreateAccountOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeCreateAccountModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex justify-center items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="inline-block w-full max-w-md">

                <div className="mt-2 flex flex-col text-center justify-center items-center p-8 space-y-2">
                  <Image width="112px" height="112px" src="https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif" className="w-28"/>
                  <h1 className="text-xl font-semibold text-gray-800">Investing Account Required!</h1>
                  <p className="text-sm text-gray-700 mb-3">
                    Please create your investing account first. Click below to create investing account.
                  </p>
                  <br/>
                  <CreateInvestingAccount/>
                </div>

              </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateBasket;
