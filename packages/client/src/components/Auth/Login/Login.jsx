import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Heading,
  VStack,
  Image,
  Flex,
  AbsoluteCenter,
  Link as ChakraLink
 
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import authScreenAtom from "../../../atoms/authAtom";
import userAtom from "../../../atoms/userAtom";
import { prevPathAtom } from "../../../atoms/prevPathAtom";
import tokenAtom from "../../../atoms/tokenAtom";
import useShowToast from "../../../hooks/useShowToast";
import { useAxiosInstance } from "../../../../api/axios";
// import { FcGoogle } from "react-icons/fc";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useRecoilState(tokenAtom);
  const axiosInstance = useAxiosInstance();
  const showToast = useShowToast();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/auth/signin",
        JSON.stringify({ email, password })
      );
      const loggedUser = response.data.loggedInUser;
      const token = response.data.token;

      localStorage.setItem("user-payGifty", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      setToken(token);
      setUser(loggedUser);

      const localStoragePrevPath = localStorage?.getItem("localPrevPath");

      if (localStoragePrevPath) {
        localStorage.removeItem("localPrevPath");
        navigate(localStoragePrevPath);
      } else if (prevPath) {
        setPrevPath(null);
        navigate(prevPath);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        showToast(
          "Error",
          "This user registered with Google authentication, continue with Google and create a password",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
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


        <Text fontSize="lg" fontWeight="bold">
          Welcome back !!!
        </Text>
        <Text fontSize="md" color="gray.500">
          Sign in
        </Text>

        {/* <Box>
          <Flex fontWeight={400} gap={4}>
            <Button
              bg={"#4c54ad"}
              size={{ base: "sm", md: "lg" }}
              _hover={{ bg: "blue" }}
              leftIcon={<FcGoogle />}
              color={"white"}
            >
              Continue with Google
            </Button>
          </Flex>
          <Box
            position="relative"
            padding="5"
            fontSize={{ base: "xl", md: "2xl" }}
          >
            <AbsoluteCenter px="1"> or </AbsoluteCenter>
          </Box>
        </Box> */}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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

            <Button
              type="submit"
              colorScheme="orange"
              width="100%"
              isLoading={loading}
              loadingText="Authenticating..."
            >
              Sign In
            </Button>
          </VStack>
        </form>

        <Text mt={4}>
          Don’t have an account?{" "}
          <ChakraLink as={Link} to="/signup" color="orange.400">
            Sign up
          </ChakraLink>
        </Text>
      </VStack>

     
    </Flex>
  );
};

export default Login;
