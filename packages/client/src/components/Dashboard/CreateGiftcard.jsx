import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
  Text,
  Stack,
  Heading,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useGiftCard } from "../Context/GiftCardContext";

const CreateGiftCard = () => {
  const [amount, setAmount] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();
  const { addGiftCard } = useGiftCard();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const giftCard = { amount, senderEmail, recipientEmail, message };
    try {
      await axios.post("http://localhost:3000/api/giftcards/create", giftCard);
      addGiftCard(giftCard);
      toast({
        title: "Gift Card Created",
        description: "A gift card PIN has been sent to the recipient's email.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create the gift card. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      p={8}
      mt={10}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <VStack spacing={6} align="stretch">
        <Heading
          textAlign="center"
          fontSize="3xl"
          color="teal.600"
          fontWeight="bold"
          mb={4}
        >
          Create a Gift Card
        </Heading>

        <Divider borderColor="teal.200" />

        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <FormControl id="amount" isRequired>
              <FormLabel fontSize="lg" color="teal.700">
                Gift Card Amount
              </FormLabel>
              <Input
                type="number"
                placeholder="Enter the amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                focusBorderColor="teal.500"
                border="2px solid"
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                borderRadius="md"
                p={4}
              />
            </FormControl>

            <FormControl id="senderEmail" isRequired>
              <FormLabel fontSize="lg" color="teal.700">
                Sender Email
              </FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                focusBorderColor="teal.500"
                border="2px solid"
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                borderRadius="md"
                p={4}
              />
            </FormControl>

            <FormControl id="recipientEmail" isRequired>
              <FormLabel fontSize="lg" color="teal.700">
                Recipient Email
              </FormLabel>
              <Input
                type="email"
                placeholder="Enter recipient's email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                focusBorderColor="teal.500"
                border="2px solid"
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                borderRadius="md"
                p={4}
              />
            </FormControl>

            <FormControl id="message">
              <FormLabel fontSize="lg" color="teal.700">
                Message (Optional)
              </FormLabel>
              <Textarea
                placeholder="Add a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                focusBorderColor="teal.500"
                border="2px solid"
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                borderRadius="md"
                p={4}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              fontSize="md"
              _hover={{
                bg: "teal.700",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Create Gift Card
            </Button>
          </Stack>
        </form>
      </VStack>
    </Box>
  );
};

export default CreateGiftCard;
