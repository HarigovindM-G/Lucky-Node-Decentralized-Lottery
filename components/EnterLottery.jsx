import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { abi, contractaddress } from "../constants/index.js";
import { useSimulateContract, useReadContract, useWriteContract } from "wagmi";
import { getChainId } from "@wagmi/core";
import { useEffect } from "react";
import { ethers } from "ethers";
import { config } from "../config.js";
import { writeContract } from "@wagmi/core";

const EnterLottery = ({ account }) => {
  const chainid = getChainId(config);
  const [entryfee, setEntryfree] = useState(null);
  const [playerNum, setPlayerNum] = useState(null);
  const [winner, setWinner] = useState(null);

  const contractAdd =
    contractaddress[chainid] || "0x4AeD2DA80738D7534508eb89Ee26416f8bd76F5A";
  const {
    data: ticketPrice,
    isError,
    isLoading,
  } = useReadContract({
    abi,
    address: contractAdd,
    functionName: "getTicketPrice",
    chainId: chainid,
  });

  const {
    data: numPlayers,
    isErrorNum,
    isLoadingNum,
  } = useReadContract({
    abi,
    address: contractAdd,
    functionName: "getNumPlayers",
    chainId: chainid,
  });

  const {
    data: recentWinner,
    isErrorWinner,
    isLoadingWinner,
  } = useReadContract({
    abi,
    address: contractAdd,
    functionName: "getRecentWinner",
    chainId: chainid,
  });

  // chain id
  useEffect(() => {
    console.log("Chain ID:", chainid);
    if (isLoading) {
      console.log("Loading ticket price...");
    } else if (isError) {
      console.log("Error fetching ticket price.");
    } else {
      setEntryfree(ethers.formatEther(ticketPrice));
      console.log("Ticket Price:", ethers.formatEther(ticketPrice || "0"));
    }
  }, [chainid, ticketPrice, isError, isLoading]);

  //num of players and winner

  async function updatePW() {
    setPlayerNum(parseInt(numPlayers));
    setWinner(recentWinner);
    console.log("Recent Winner", recentWinner);
    console.log("NumberofPlayers", parseInt(numPlayers));
  }
  useEffect(() => {
    if (isLoadingNum) {
      console.log("Loading Number of players ..  ");
    } else if (isErrorNum) {
      console.log("Error in geting the number of players");
    } else {
      // setPlayerNum(parseInt(numPlayers));
      // setWinner(recentWinner);
      // console.log("Recent Winner", recentWinner);
      // console.log("NumberofPlayers", parseInt(numPlayers));
      updatePW();
    }
  }, [chainid, numPlayers, isErrorNum, isLoadingNum, recentWinner]);

  useEffect(() => {
    updatePW();
  }, [numPlayers, recentWinner, isLoadingNum, isErrorNum]);

  const handleEnterLottery = async () => {
    try {
      const result = await writeContract(config, {
        abi,
        address: contractAdd,
        functionName: "EnterLottery",
        args: [],
        value: ticketPrice,
      });
      updatePW();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="text-4xl h-screen flex flex-col justify-center items-center pb-24 px-20 -translate-y-10">
      <button
        className="bg-[#ffdf29f5] text-[#333333] px-5 py-3 rounded-xl font-normal hover:opacity-50"
        onClick={handleEnterLottery}
      >
        ENTER LOTTERY
      </button>
      <div className="flex flex-row">
        <h2 className=" text-[#FFD700] text-xl mt-2 font-normal">
          Enty Fee: {entryfee}
        </h2>
        <FaEthereum className="mt-3 ml-1" size={20} />
      </div>
      <div className="text-3xl mt-10">
        Number of Players: <span className="text-[#FFFDD0]">{playerNum}</span>
      </div>
      <div className="text-3xl mt-4">
        Recent Winner:<span className="text-[#FFFDD0]">{winner}</span>
      </div>
    </div>
  );
};

export default EnterLottery;
