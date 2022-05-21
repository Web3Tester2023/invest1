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

const CreateInvestingAccount = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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
  
  const handleCreateAccount = async () => {
    createInvestingAccount(name, username)
  }
  return (
    <>
      <Button
        title="Create Investing Account"
        primary
        className="justify-center max-w-[200px]"
        onClick={ openModal }
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900 border-b border-gray-50 pb-3 mb-4"
                  >
                    <p>Create Investing Account</p>
                    <button type="button" className="" onClick={closeModal}>
                      <IoClose />
                    </button>
                  </Dialog.Title>
                  <Input
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    onChange={(e) => setName(e.target.value)}
                    // rightIcon={<IoSearch className="text-lg  text-gray-600" />}
                  />
                  <Input
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                    // rightIcon={<IoSearch className="text-lg  text-gray-600" />}
                  />
                  <div className="mt-4">
                    <Button
                      loading={isAccountCreating}
                      title="Create"
                      primary
                      onClick={handleCreateAccount}
                      className="justify-center float-right max-w-[120px]"
                    />
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

export default CreateInvestingAccount;
