import React from "react";
import { Box, Heading, Text, SimpleGrid, Image, Stack } from "@chakra-ui/react";

const Content = () => {
  return (
    <Box as="section" py={10} px={4} maxW="1200px" mx="auto" textAlign="center">
      <Box mb={10}>
        <Heading as="h2" size="xl" mb={4}>
          How Does It Work
        </Heading>
        <Text fontSize="lg">Here are 3 simple steps to use PayGifty</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        <Stack spacing={4} align="center" textAlign="center">
          <Image
            src="Ellipse2.png"
            alt="Step 1"
            boxSize="120px"
            objectFit="cover"
          />
          <Heading as="h4" size="md">
            1
          </Heading>
          <Heading as="h3" size="lg" fontWeight="bold">
            Ready To Use Template
          </Heading>
          <Text>
            Add a personal message and choose a design for the gift card
          </Text>
        </Stack>

        {/* Step 2 */}
        <Stack spacing={4} align="center" textAlign="center">
          <Image
            src="Ellipse3.png"
            alt="Step 2"
            boxSize="120px"
            objectFit="cover"
          />
          <Heading as="h4" size="md">
            2
          </Heading>
          <Heading as="h3" size="lg" fontWeight="bold">
            Choose Crypto Currency
          </Heading>
          <Text>
            Select the cryptocurrency you want to gift and choose the value of
            the gift card you want to buy.
          </Text>
        </Stack>

        {/* Step 3 */}
        <Stack spacing={4} align="center" textAlign="center">
          <Image
            src="Ellipse4.png"
            alt="Step 3"
            boxSize="120px"
            objectFit="cover"
          />
          <Heading as="h4" size="md">
            3
          </Heading>
          <Heading as="h3" size="lg" fontWeight="bold">
            Send Your Gift Card
          </Heading>
          <Text>
            Click on the 'create gift card' button and easily send your card to
            loved ones.
          </Text>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default Content;
