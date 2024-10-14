import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { PayGiftyContext } from "../../context/PayGiftyProvider";
import axios from "axios";
import { ethers } from "ethers";

const RedeemGiftcard = () => {
  const { redeemGiftCard, provider, currentAccount } =
    useContext(PayGiftyContext);
  const [code, setCode] = useState("");
  const [redeemed, setRedeemed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRedeem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/giftcards/redeem",
        { code, currentAccount }
      );
      const { amount } = response.data;
      await addFundsToWallet(amount);
      setRedeemed(true);
      alert("Gift card redeemed!");
    } catch (error) {
      console.error(error);
      alert("Error redeeming gift card");
    }
    setIsLoading(false);
  };

  const addFundsToWallet = async (amount) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tx = {
          to: currentAccount,
          value: ethers.utils.parseEther(amount.toString()),
        };
        await signer.sendTransaction(tx);
      } catch (error) {
        console.error("Error adding funds to wallet:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  return (
    <Box  mt={15}>
      {/* <Flex justifyContent="center" mt={4} gap={4}>
        <Text
          textAlign="center"
          fontSize="3xl"
          color="#A52A2A"
          fontWeight="900"
        >
          Welcome, Redeem your Gift Card today!!!
        </Text>
      </Flex> */}

      <Flex justifyContent="center" >
        <Card
          h="300px"
          rounded="lg"
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)"
          w="810px"
          height="20rem"
        >
          <CardBody>
            <Text as="h2" color="black" fontWeight={700} fontSize={25}>
              Enter Your Gift Card Code Here
            </Text>

            <Flex justifyContent="center" my="70px">
              <Input
                placeholder="Paste here"
                width="500px"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                border="1px solid black"
              />
            </Flex>

            <Flex justifyContent="center">
              <Button
                borderRadius="md"
                // bg="#A52A2A"
                colorScheme="orange"
                px={10}
                h={8}
                onClick={handleRedeem}
                isLoading={isLoading}
              >
                Redeem
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      {redeemed && (
        <Flex justifyContent="center" mt={4}>
          <Text fontSize="lg" color="green.500">
            Gift card has been redeemed!
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default RedeemGiftcard;
