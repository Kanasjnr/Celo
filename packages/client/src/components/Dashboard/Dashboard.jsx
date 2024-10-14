import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Flex, Heading, Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PayGiftyContext } from '../../context/PayGiftyProvider';
import { ethers } from 'ethers';
import axios from 'axios';

// Predefined list of colors
const cardColors = ['#00008B', '#000000', '#A52A2A', '#008000', '#800080', '#808000', '#34282C', '#033E3E', '#78866B'];

const Dashboard = () => {
  const { buyGiftCard, redeemGiftCard, provider, currentAccount } = useContext(PayGiftyContext);

  const [giftCards, setGiftCards] = useState([]);
  const [purchasedCards, setPurchasedCards] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState('');
  const { isOpen: isCongratulationModalOpen, onOpen: onCongratulationOpen, onClose: onCongratulationClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/giftcards');
        setGiftCards(response.data);
      } catch (error) {
        console.error('Error fetching gift cards:', error);
      }
    };

    fetchGiftCards();
  }, []);

  const handleBuyGiftCard = async (cardId, amount) => {
    if (!provider) {
      setModalMessage('Unable to purchase. Please connect your wallet.');
      onOpen();
      return;
    }
    try {
      const balance = await provider.getBalance(currentAccount);
      const balanceInEther = ethers.utils.formatEther(balance);
      if (parseFloat(balanceInEther) < parseFloat(amount)) {
        setModalMessage('The amount in your wallet is insufficient to buy this card.');
        onOpen();
      } else {
        await buyGiftCard();
        setPurchasedCards([...purchasedCards, cardId]);
        onCongratulationOpen();
      }
    } catch (error) {
      console.error('Error checking balance:', error);
      setModalMessage('Error checking balance. Please try again.');
      onOpen();
    }
  };

  return (
    <Box bg="orange.50" p={[4, 6, 8]} flex="1">
      <Flex
        gap={[4, 6, 10, 20]}
        direction={["column", "column", "row"]}
        justifyContent={["center", "center", "space-between"]}
        alignItems={["center", "center", "flex-start"]}
      >
        <Flex
          direction={"column"}
          alignItems={["center", "center", "flex-start"]}
        >
          <Heading
            as="h1"
            size="lg"
            mb={4}
            textAlign={["center", "center", "left"]}
          >
            Effortless Gifting
          </Heading>
          <Text
            mb={6}
            fontSize={["16px", "18px", "20px"]}
            textAlign={["center", "center", "left"]}
          >
            Unlock the Power of Choice: Create and <br /> redeem your crypto
            gift cards here at <br /> PayGifty!
          </Text>
          <Flex
            mt={10}
            direction={"column"}
            alignItems={["center", "center", "flex-start"]}
          >
            <Button
              colorScheme="orange"
              mb={5}
              width={["100%", "auto"]}
              onClick={() => navigate("/create")}
            >
              Create Giftcard
            </Button>
            <Button
              colorScheme="orange"
              width={["100%", "auto"]}
              onClick={() => navigate("/redeem")}
              mb={5}
            >
              Redeem Giftcard
            </Button>
          </Flex>
        </Flex>

        <Image
          src="/giftsent.png"
          width={["100%", "300px", "400px"]}
          height={["auto", "400px", "500px"]}
        />
      </Flex>
      <Text fontSize={30}>
        My Gift-Cards
      </Text>

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
        {giftCards.map((card, index) => (
          <Box
            key={card._id}
            width="300px"
            height="200px"
            bg={cardColors[index % cardColors.length]} // Use different background color
            mt={10}
            borderRadius="lg"
            boxShadow="xl"
            p={4}
            position="relative"
          >
            <Text
              position="absolute"
              top={2}
              left={4}
              fontSize="xl"
              fontWeight="bold"
              color="white"
            >
              payGifty
            </Text>
            <Text
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              fontSize="4xl"
              fontWeight="bold"
              color="white"
            >
              ${card.amount}
            </Text>
            <Flex
              position="absolute"
              bottom={4}
              left={4}
              alignItems="center"
            >
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="white"
              >
                {card.message}
              </Text>
            </Flex>
            <Flex
              position="absolute"
              bottom={4}
              right={4}
              alignItems="center"
            >
              {purchasedCards.includes(card._id) ? (
                <Button
                  size="sm"
                  colorScheme="green"
                  variant="solid"
                  width={20}
                  disabled
                >
                  Purchased
                </Button>
              ) : (
                <Button
                  size="sm"
                  colorScheme="orange"
                  variant="solid"
                  width={20}
                  onClick={() => handleBuyGiftCard(card._id, card.amount)}
                >
                  Buy
                </Button>
              )}
            </Flex>
          </Box>
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCongratulationModalOpen} onClose={onCongratulationClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Congratulations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The gift card has been bought successfully!</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onCongratulationClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
