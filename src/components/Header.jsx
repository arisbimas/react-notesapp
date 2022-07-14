import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  Img,
  Avatar,
  Tag,
  TagLabel,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ImgBrand from "../assets/imgbrand1.png";
import { logout, auth, db } from "../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
// import Login from "./Login";
import { connect } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { clearLS, getUserDataLocal } from "../services/localStorage";

const styBtn = {
  bg: "none",
  _hover: "none",
};

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const welcomeMsg = () => {
    setTimeout(() => {
      toast({
        title: `Welcome Back, ${user.displayName}`,
        description: `have a nice day!`,
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    }, 3000);
  };

  const fetchUserName = async () => {
    try {
      //debugger;
      if (user) {
        let u = getUserDataLocal();
        setName(u.name);

        //get name from server
        // const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // const doc = await getDocs(q);
        // const data = doc.docs[0].data();
        // debugger;
        // if (data) {
        //   setName(data.name);
        // }
      }

      // console.log(user);

      //let currentUID = localStorage.getItem("UserID");
    } catch (err) {
      console.error(err);
      console.error("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    if (name) {
      welcomeMsg();
    }
  }, [name]);

  const handleLogout = async () => {
    let out = await logout();
    clearLS();
  };

  // console.log("render header");
  // console.log(props.userData);

  return (
    <>
      <Box
        bg={useColorModeValue("brand.500", "gray.900")}
        px={[2, 4, 6, 10]}
        mb={5}
        pos="fixed"
        w="100%"
        zIndex="100"
      >
        <Flex h={28} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading
              as="a"
              href="#"
              size="md"
              fontFamily="Dancing Script"
              fontSize="3xl"
            >
              <Img src={ImgBrand} maxW={["25%", "14%"]}></Img>
            </Heading>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2} border="none">
              {/* <Button sx={styBtn}>
                                <EditIcon></EditIcon>
                            </Button>
                            <Button sx={styBtn}>
                                <AttachmentIcon></AttachmentIcon>
                            </Button> */}

              <Button sx={styBtn} onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </Button>
              <Button onClick={toggleColorMode} sx={styBtn}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Tag size="lg" colorScheme="purple" borderRadius="full">
                <Avatar bg={"brand.100"} size="xs" ml={-1} mr={2} />
                <TagLabel>{name}</TagLabel>
              </Tag>
              {/* <Avatar bg="brand.100" size={"md"} /> */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Header;
