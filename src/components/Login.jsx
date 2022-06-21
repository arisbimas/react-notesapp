import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  setUserDataLocal,
  getUserByUID,
} from "../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faHandcuffs,
  faUserNinja,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import {
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
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
  useToast,
  useBoolean,
} from "@chakra-ui/react";
import ImgLogin from "../assets/login.svg";
import { connect } from "react-redux";

// import "./Login.css";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useBoolean();
  const [user, loading, error] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  useEffect(() => {
    if (user) navigate("/home");
  }, []);

  const register = () => {
    if (!name) {
      alert("Please enter name");
      return false;
    }
    registerWithEmailAndPassword(name, email, password)
      .then((res) => {
        getUserByUID(res.uid)
          .then((resUser) => {
            debugger;
            props.setUserData({
              userData: resUser,
            });
            toast({
              title: "Success Register",
              description: resUser.code,
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            navigate("/home");
          })
          .finally(setLoading.off);
      })
      .catch((err) => {
        toast({
          title: "Error Register",
          description: err.code,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading.on();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        getUserByUID(res.user.uid)
          .then((resUser) => {
            debugger;
            props.setUserData({
              userData: resUser,
            });
            toast({
              title: "Success Login",
              description: resUser.code,
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            navigate("/home");
          })
          .finally(setLoading.off);
      })
      .catch((err) => {
        toast({
          title: "Error Login",
          description: err.code,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleLoginGoogle = (e) => {
    signInWithGoogle().then((result) => {
      debugger;
      if (result) {
        setUserDataLocal(result.uid);
        navigate("/home");
      } else {
        toast({
          title: "Error Login",
          description: result.code,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  console.log(props);
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
            <TabList mb="1em" color={"gray.900"} fontFamily="Roboto">
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
                        color="gray.100"
                        children={<FontAwesomeIcon icon={faAt} />}
                      />
                      <Input
                        type="email"
                        bgColor="gray.500"
                        color="gray.100"
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
                        color="gray.100"
                        children={<FontAwesomeIcon icon={faHandcuffs} />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        bgColor="gray.500"
                        color="gray.100"
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
                    //bgColor="brand.400"
                    colorScheme="brand"
                    width="full"
                    isLoading={isLoading}
                    loadingText="Loading..."
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Stack>
              </TabPanel>

              {/* Register section */}
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
                        color="gray.100"
                        children={<FontAwesomeIcon icon={faUserNinja} />}
                      />
                      <Input
                        type="text"
                        bgColor="gray.500"
                        color="gray.100"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.100"
                        children={<FontAwesomeIcon icon={faAt} />}
                      />
                      <Input
                        type="email"
                        bgColor="gray.500"
                        color="gray.100"
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
                        color="gray.100"
                        children={<FontAwesomeIcon icon={faHandcuffs} />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        bgColor="gray.500"
                        color="gray.100"
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
                    //bgColor="brand.400"
                    colorScheme="brand"
                    width="full"
                    onClick={register}
                  >
                    Register
                  </Button>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
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
                onClick={handleLoginGoogle}
              >
                Login with Google
              </Text>
            </Box>
          </Box>
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

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (data) => dispatch({ type: "SET_USERDATA", data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
