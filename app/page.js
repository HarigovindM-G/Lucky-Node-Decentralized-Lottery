"use client";
import EnterLottery from "@/components/EnterLottery";
import Header from "@/components/Header";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useAccount } from "wagmi";

export default function Home() {
  const [walletPresent, setwalletPresent] = useState(false);
  const [walletConnected, setwalletConnected] = useState(false);
  const [account,setAccount] = useState("")

  const { address, isConnected } = useAccount();

  return (
    <main className=" h-screen text-[#FFD700] font-thin">
      <Header
        walletPresent={walletPresent}
        walletConnected={walletConnected}
        setwalletConnected={setwalletConnected}
        setwalletPresent={setwalletPresent}
        setAccount={setAccount}
        account={account}
      />
      {walletPresent && walletConnected ? (
        <EnterLottery account={account}/>
      ) : (
        <div className="text-5xl h-screen flex flex-col justify-center items-center pb-24 px-20 -translate-y-10">
          <div>
            PLEASE CONNECT YOUR WEB3 WALLET TO ENTER THE DECENTRALIZED LOTTERY{" "}
          </div>
          <div className="mt-12 text-2xl text-[#FFFFF0]">
            DONT HAVE A WEB3 WALLET ?
          </div>
          <div className="text-2xl text-[#FFFFF0]">
            SET UP YOUR WALLET NOW AT{" "}
            <a href="https://metamask.io/" className="text-[#ae9a00]">
              metamask.io
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
