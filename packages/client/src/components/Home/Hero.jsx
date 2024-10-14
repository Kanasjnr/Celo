import React from "react";
import { Box, Heading, Text, Button, Image, Stack } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box as="section" padding="4" justifyContent={"space-between"} mx="auto" my="10">
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        spacing={{ base: 10, md: 20 }}
      >
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading
            as="h3"
            size="lg"
            fontWeight="bold"
            mb={4}
            lineHeight="1.5"
            fontFamily={"georgia"}
          >
            With <Text as="span" color="#f4803a" >PayGifty</Text> Surprise your loved ones with affordable gifts <br /> In An Easy Way
          </Heading>

          <Text mb={6} fontFamily={"georgia"}>
            Make your loved one's day extra special by surprising them with a thoughtful and affordable gift. Whether it's for a birthday, anniversary, or just to show them how much you care, finding the perfect present doesn't have to break the bank.
          </Text>

    <Button color={"white"} background={"#f4803a"} size="lg">
            Get Started
          </Button>
        </Box>

        <Box flex="1" textAlign="center">
          <Image
            src="heroImg.png"
            alt="heropic"
            className="heroPic"
            // boxSize={{ base: "250px", md: "400px" }}
            objectFit="cover"
            borderRadius={"30px"}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Hero;
