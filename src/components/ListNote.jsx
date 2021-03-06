import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Divider,
  Img,
  Center,
  Button,
  ScaleFade,
  useToast,
  Skeleton,
  SimpleGrid,
} from "@chakra-ui/react";
import ImgNoData from "../assets/nodata.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../services/firestore";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { getUserDataLocal } from "../services/localStorage";
import { connect } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";

function ListNote(props) {
  const [userNoteData, setUserNoteData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState(getUserDataLocal());
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();
  // let userID = localStorage.getItem("UserID") || "";
  // const noteRef = doc(db, 'DataNotes', userID, "Notes");

  useEffect(() => {
    // let uID = localStorage.getItem("UserID");
    setLoading(true);
    if (userData && userData.uid) {
      const q = query(
        collection(db, "DataNotes", userData.uid, "Notes"),
        orderBy("created", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        setUserNoteData(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setLoading(false);
      });
    } else {
      if (user) {
        console.log(user);
      }
      setLoading(false);
    }
  }, []);

  const handleDeleteNote = async (data) => {
    await deleteDoc(doc(db, "DataNotes", userData.uid, "Notes", data))
      .then(() => {
        msgAlert("success", "Success", "Data Deleted");
      })
      .catch((error) => {
        msgAlert("error", "error", error);
      });
  };

  const msgAlert = (status, msgTitle, msgDesc) => {
    toast({
      title: msgTitle,
      description: msgDesc,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  const container = {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 5px",
    justifyContent: "space-evenly",
  };

  const box = {
    border: "1px dashed",
    borderColor: "brand.50",
    borderRadius: "12px",
    padding: "0.75rem",
    display: "block",
    letterSpacing: ".01428571em",
    fontSize: ".875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
    height: "max-content",
    marginBottom: "10px",
    cursor: "pointer",
  };

  const disp = {
    display: "contents",
  };

  const bx = {
    /*important for dinamic box*/
    flex: "0 0 calc(33.33% - 10px)",
    margin: "5px",

    /*just for style box*/
    border: "1px dashed",
    borderColor: "brand.50",
    borderRadius: "12px",
    padding: "0.75rem",
    letterSpacing: ".01428571em",
    fontSize: ".875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
    height: "max-content",

    /*** Just to center the text ***/
    // display: "inline-flex",
    // justifyContent: "center",
    // alignItems: "center",
  };

  //console.log("render listnote");

  return (
    <Box
      w={{ md: "64%" }}
      mt={[5, 5, 0, 0]}
      display={{ md: "block" }}
      h={"max-content"}
      fontFamily="Handlee"
    >
      <Box sx={container} className="listNote">
        {isLoading ? (
          // <Center><Text className='noteTitle' pb={3} pr={9} fontWeight="bold">
          //     Loadinggg...
          // </Text></Center>
          <SimpleGrid columns={2} spacing={10} w="100%">
            <Skeleton color="black" height="50px" />
            <Skeleton color="black" height="50px" />
            <Skeleton color="black" height="50px" />
            <Skeleton color="black" height="50px" />
            <Skeleton color="black" height="50px" />
            <Skeleton color="black" height="50px" />
            <Skeleton color="black" height="50px" />
            <Skeleton color="black" height="50px" />
            <Skeleton color="black" height="50px" />
          </SimpleGrid>
        ) : (
          <ScaleFade
            initialScale={0.9}
            in={!isLoading}
            className="displaycontents"
          >
            {userNoteData.length > 0 ? (
              userNoteData.map(({ id, data }) => (
                <Box display={"contents"} key={id}>
                  <Box
                    sx={box}
                    w={["100%", "50%", "50%", "30%"]}
                    mt={["10px", "0px"]}
                    bg={data.bg}
                    boxShadow={"xl"}
                    pos="relative"
                  >
                    <Button
                      colorScheme="brand"
                      variant="outline"
                      border={"none"}
                      pos={"absolute"}
                      top={1}
                      right={1}
                      onClick={() => handleDeleteNote(id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Box
                      onClick={() => {
                        let dataNoteDetail = userNoteData.filter(
                          (x) => x.id === `${id}`
                        );

                        if (dataNoteDetail.length >= 0) {
                          // onSelectNote(dataNoteDetail[0]);
                          delete dataNoteDetail[0]["data"]["created"];
                          delete dataNoteDetail[0]["data"]["updated"];
                          debugger;
                          props.setDetailNote(dataNoteDetail[0]);
                          // props.setBgNotes(dataNoteDetail[0]["data"]["bg"]);
                        } else {
                        }
                      }}
                    >
                      <Text
                        className="noteTitle"
                        pb={3}
                        pr={10}
                        fontWeight="bold"
                        minH={9}
                      >
                        {data.title}
                      </Text>
                      <Divider />
                      <Box className="noteDesc" pt={3} minH={20}>
                        {data.note}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Center>
                <Img src={ImgNoData} />
              </Center>
            )}
          </ScaleFade>
        )}
      </Box>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    detailNote: state.detailNote,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDetailNote: (data) => dispatch({ type: "SET_DETAIL_NOTE", data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListNote);
