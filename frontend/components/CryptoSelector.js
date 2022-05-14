import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  IoCheckbox,
  IoCheckmark,
  IoCheckmarkCircle,
  IoClose,
  IoSearch,
} from "react-icons/io5";
import { Button, ListItem } from "../uikit";

const CryptoSelector = ({ setBasketCryptos, cryptos, selectedCryptos }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    console.log(cryptos);
    setIsOpen(true);
  }
  const filteredCrypto =
    query === ""
      ? cryptos
      : cryptos.filter((crypto) =>
          crypto.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
    const addOrRemove = (value) => {
            // var tokens = selectedCryptos;
            var index = selectedCryptos.indexOf(value);
            if (index === -1) {
              selectedCryptos.push(value);
            } else {
              selectedCryptos.splice(index, 1);
            }
            setBasketCryptos(selectedCryptos)
            console.log("Selected", selectedCryptos)
        }
  return (
    <>
      <Button
        title="Add Token"
        primary
        className="justify-center max-w-[150px]"
        onClick={openModal}
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
                    className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900 border-b border-gray-50 pb-3"
                  >
                    <p>Select Tokens</p>
                    <button type="button" className="" onClick={closeModal}>
                      <IoClose />
                    </button>
                  </Dialog.Title>
                  <div className="flex border border-gray-100 rounded-md mt-2 p-1 items-center ">
                    <IoSearch className="text-xl m-2 text-gray-600" />
                    <input
                      placeholder="Search Token"
                      className="w-full focus:ring-0 focus:ring-offset-0 focus:outline-none"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <div className="mt-2 h-80">
                    {filteredCrypto.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700 flex justify-center items-center">
                        Nothing found.
                      </div>
                    ) : (
                      filteredCrypto.map((crypto, index) => (
                        <ListItem
                          key={index}
                          title={crypto.name}
                          subTitle={crypto.symbol}
                          image={crypto.icon}
                          onClick={() => addOrRemove(crypto)}
                          left={
                            selectedCryptos.includes(crypto) ? 
                            <IoCheckmarkCircle className="text-xl text-indigo-600" />
                            : null
                          }
                        />
                      ))
                    )}
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

export default CryptoSelector;
