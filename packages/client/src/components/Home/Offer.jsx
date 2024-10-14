import React from "react";
import { Box, Heading, Text, Image, SimpleGrid, Stack } from "@chakra-ui/react";

const Offer = () => {
  return (
    <Box as="section" py={10} px={4} maxW="1200px" mx="auto">
      <Heading as="h2" size="xl" textAlign="center" mb={10}>
        What Can You Do On{" "}
        <Text as="span" color="#f4803a">
          PayGifty
        </Text>
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        <Box
          p={6}
          boxShadow="lg"
          borderRadius="lg"
          bg="white"
          textAlign="center"
        >
          <Image src="giftCard.png " alt="Create Crypto Gift Card" mb={4} mx="auto" />
          <Heading as="h3" size="md" mb={2}>
            Create Crypto Gift Card
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
            voluptate pariatur soluta veritatis incidunt eos! Molestias
            dignissimos optio necessitatibus sunt.
          </Text>
        </Box>

        
        <Box
          p={6}
          boxShadow="lg"
          borderRadius="lg"
          bg="white"
          textAlign="center"
        >
          <Image src="redeeemGift.png" alt="Redeem Crypto Gift Card" mb={4} mx="auto"/>
          <Heading as="h3" size="md" mb={2}>
            Redeem Crypto Gift Card
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
            voluptate pariatur soluta veritatis incidunt eos! Molestias
            dignissimos optio necessitatibus sunt.
          </Text>
        </Box>

        <Box
          p={6}
          boxShadow="lg"
          borderRadius="lg"
          bg="white"
          textAlign="center"
        >
          <Image src="designGift.png" alt="Customise Gift Card Design" mb={4} mx="auto" />
          <Heading as="h3" size="md" mb={2}>
            Customise Gift Card Design
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
            voluptate pariatur soluta veritatis incidunt eos! Molestias
            dignissimos optio necessitatibus sunt.
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Offer;
