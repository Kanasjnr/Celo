import React from 'react';
import { Box, Text, Heading, Stack, HStack, Icon, Divider } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const Footer = () => {
  const date = new Date();
  const Year = date.getFullYear();

  return (
    <Box as="footer" bg="gray.800" color="white" py={10} px={4}>
      <Box maxW="1200px" mx="auto" textAlign="center">
        <Heading as="h2" size="xl" mb={4}>PayGifty</Heading>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          spacing={8}
          mb={8}
          textAlign={{ base: 'center', md: 'left' }}
        >
          {/* Footer Details */}
          <Box maxW={{ base: '100%', md: '40%' }}>
            <Text>
              Welcome to PayGifty, where innovation meets convenience! As a leading platform, we specialize in creating gift cards and facilitating crypto payments, delivering exceptional products and services tailored to your needs.
            </Text>
            <HStack spacing={4} mt={4} justify={{ base: 'center', md: 'start' }}>
              <Icon as={FaFacebook} boxSize={5} color="blue.500" />
              <Icon as={RiTwitterXFill} boxSize={5} />
              <Icon as={FaInstagram} boxSize={5} color="red.500" />
              <Icon as={FaLinkedin} boxSize={5} color="blue.500" />
            </HStack>
          </Box>

          {/* Customer Care */}
          <Box>
            <Heading as="h3" size="md" mb={2}>Customer Care</Heading>
            <Text>Help Center</Text>
            <Text>Terms & Conditions</Text>
            <Text>Privacy Policy</Text>
          </Box>

          {/* Pages */}
          <Box>
            <Heading as="h3" size="md" mb={2}>Pages</Heading>
            <Text>About Us</Text>
            <Text>Contact Us</Text>
            <Text>Services</Text>
            <Text>Blogs</Text>
          </Box>
        </Stack>

        <Divider mb={4} />

        {/* Footer Bottom */}
        <Text fontSize="sm">&copy; {Year} PayGifty. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default Footer;
