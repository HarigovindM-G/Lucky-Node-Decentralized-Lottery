"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { useBalance, useAccount, useAccountEffect } from "wagmi";
import { useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import { useConnect } from "wagmi";
import {injected} from "wagmi/connectors"


const Header = ({
  walletPresent,
  walletConnected,
  setwalletConnected,
  setwalletPresent,
  setAccount,
  account,
}) => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  

  useEffect(() => {
    if (address) {
      setAccount(address);
      setwalletConnected(true);
      setwalletPresent(true);
    }
  }, [address, setAccount, setwalletConnected, setwalletPresent]);

  useAccountEffect({
    onDisconnect() {
      console.log('Disconnected!')
      setwalletConnected(false)
    },
  })

  const { connect } = useConnect()

  //migrated to wagmi
  // const connect = async () => {
  //   // if (typeof window.ethereum !== "undefined") {
  //   //   setwalletPresent(true);
  //   //   try {
  //   //     const accounts = await window.ethereum.request({
  //   //       method: "eth_requestAccounts",
  //   //     });
  //   //     setwalletConnected(true);
  //   //     setAccount(accounts[0]);

  //   //   } catch (e) {
  //   //     setwalletConnected(false);
  //   //     console.log(e);
  //   //   }
  //   // } else {
  //   //   setwalletPresent(false);
  //   //   window.alert("No Web3 Wallet Present")
  //   // }
  // };

  return (
    <div className="bg-black flex justify-between p-4 text-[#FFD700] z-50 sticky top-0">
      <h1 className="text-4xl font-thin">LUCKY NODE</h1>
      {walletConnected && walletPresent ? (
        <div className="flex flex-row mr-20 bg-[#454545] rounded-lg">
          <div className=" bg-[#1E272C] px-4 py-2 rounded-lg text-[#FFD700] font-medium">
            {/* {account.slice(0, 6)}....{account.slice(account.length - 5)} */}
            {address
              ? `${address.slice(0, 6)}....${address.slice(-4)}`
              : "No Address"}
          </div>
          <div className="px-4 py-2 rounded-lg">
            {balanceData ? (
              <div className="flex flex-row">
                {(ethers.formatEther(balanceData.value)).slice(0,6)} <FaEthereum className="mt-0.5 ml-1" />
              </div>
            ) : (
              "0.00 ETH"
            )}
          </div>
        </div>
      ) : (
        <button
          className="mr-20 bg-[#1E272C] px-4 py-1 rounded-lg text-[#FFD700] font-thin"
          onClick={() => connect({ connector: injected() })}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Header;
