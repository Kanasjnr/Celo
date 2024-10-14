import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  useToast,
  Flex,
  Link,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";


const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(true);

    setLoading(false);
  };



  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      mt={12}
      mb={12}
      bg="white"
    >
      <VStack
        spacing={4}
        bg="white"
        boxShadow="lg"
        borderRadius="30px"
        p={8}
        w={{ base: "90%", md: "40%" }}
        maxW="lg"
        px={{ base: 4, md: 16 }}
        py={{ base: 4, md: 8 }}
      >
        <Link as={RouterLink} to="/">
          <Image src="/PayGifty.png" alt="payGifty Logo" />
        </Link>

        <Heading as="h1" size="md" mt={4}>
          Sign Up
        </Heading>

      
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spacing={4} w="100%">
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>

            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter password"
                  required
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Confirm password"
                  required
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowConfirmPassword(
                        (showConfirmPassword) => !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="orange"
              isLoading={loading}
              loadingText="Signing you up..."
              width="100%"
            >
              Sign Up
            </Button>
          </VStack>
        </form>

        <Text mt={4}>
          Have An Account?{" "}
          <Link as={RouterLink} to="/auth">
            <Text as="span" color="orange.400">
              Sign In
            </Text>
          </Link>
        </Text>
      </VStack>
    </Flex>
  );
};

export default Register;
