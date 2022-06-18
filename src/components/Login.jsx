import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandcuffs, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Img,
  Center,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import ImgLogin from "../assets/login.svg";
import { Formik } from "formik";
// import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();

    logInWithEmailAndPassword(email, password);
  };

  return (
    <Box
      width="100%"
      height="100vh"
      backgroundColor="brand.50"
      justifyContent="center"
      alignItems="center"
      display={{ md: "flex" }}
    >
      <Stack
        w={{ sm: "100%", md: "50%" }}
        display={{ md: "inline-block" }}
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="80%" margin="auto">
          <Center>
            <Heading color="brand.400" fontFamily="Dancing Script" p={30}>
              Welcome
            </Heading>
          </Center>
          {/* form */}

          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="#F0F0F0"
                  boxShadow="md"
                  px={10}
                  py={30}
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.900"
                        children={<FontAwesomeIcon icon={faUserNinja} />}
                      />
                      <Input
                        type="email"
                        bgColor="#E8F0FE"
                        color="gray.900"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.900"
                        children={<FontAwesomeIcon icon={faHandcuffs} />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        bgColor="#E8F0FE"
                        color="gray.900"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleShowPassword}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                      {/* <Link>forgot password?</Link> */}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    bgColor="brand.400"
                    width="full"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Stack>
                <Box
                  w="70%"
                  m="auto"
                  px={10}
                  py={30}
                  justifyContent={"center"}
                  alignItems={"center"}
                  display="flex"
                >
                  <Box
                    w="184px"
                    h="42px"
                    bgColor="#4285f4"
                    borderRadius="2px"
                    boxShadow="0 3px 4px 0 rgba(0,0,0,.25)"
                    cursor="pointer"
                  >
                    <Box
                      className="iconWrapper"
                      pos="absolute"
                      mt="1px"
                      ml="1px"
                      w="40px"
                      h="40px"
                      borderRadius="2px"
                      bgColor="white"
                    >
                      <Img
                        pos="absolute"
                        mt="11px"
                        ml="11px"
                        w="18px"
                        h="18px"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      />
                    </Box>
                    <Text
                      float="right"
                      m="11px 11px 0 0"
                      color="white"
                      fontSize="14px"
                      letterSpacing="0.2px"
                      fontFamily="Roboto"
                      onClick={signInWithGoogle}
                    >
                      Login with Google
                    </Text>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel>
                <h1>Register</h1>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
      <Box w={{ sm: "100%", md: "50%" }} display={{ md: "block" }}>
        <Center>
          <Img src={ImgLogin} maxW={400} w={{ sm: "70%", md: "50%" }} />
        </Center>
        {/* New to us?{" "} */}
        {/* <Link color="teal.500" href="#">
                    Sign Up
                </Link> */}
      </Box>
    </Box>
  );
}

export default Login;
