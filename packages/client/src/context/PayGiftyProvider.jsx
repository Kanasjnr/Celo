import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { contractAbi, contractAddress } from "../../utils/constants";

export const PayGiftyContext = createContext();

export const PayGiftyProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  useEffect(() => {
    detectMetaMask();
  }, []);

  const detectMetaMask = async () => {
    try {
      const ethereumProvider = await detectEthereumProvider();
      setMetamaskInstalled(Boolean(ethereumProvider));
      if (!ethereumProvider) {
        throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
      }
    } catch (error) {
      console.error("Failed to detect MetaMask:", error);
    }
  };

  const initializeProvider = async () => {
    try {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        const ethersProvider = new ethers.providers.Web3Provider(ethereumProvider);
        setProvider(ethersProvider);

        const accounts = await ethereumProvider.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        const ethersSigner = ethersProvider.getSigner();
        setSigner(ethersSigner);
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, ethersSigner);
        setContract(contractInstance);
      } else {
        throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
      }
    } catch (error) {
      console.error("Failed to initialize provider:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (metamaskInstalled) {
        await initializeProvider();
      } else {
        throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const buyGiftCard = async () => {
    try {
      const tx = await contract.buyGiftCard({ value: ethers.utils.parseEther('0.01') });
      await tx.wait();
      console.log('Gift Card Bought!');
    } catch (error) {
      console.error("Failed to buy gift card:", error);
    }
  };

  const redeemGiftCard = async (cardId) => {
    try {
      const tx = await contract.redeemGiftCard(cardId);
      await tx.wait();
      console.log('Gift Card Redeemed!');
    } catch (error) {
      console.error("Failed to redeem gift card:", error);
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
    setProvider(null);
    setSigner(null);
    setContract(null);
  };

  return (
    <PayGiftyContext.Provider
      value={{
        provider,
        signer,
        contract,
        currentAccount,
        connectWallet,
        buyGiftCard,
        redeemGiftCard,
        disconnectWallet,
      }}
    >
      {children}
    </PayGiftyContext.Provider>
  );
};
