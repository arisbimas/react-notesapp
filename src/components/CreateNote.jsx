import React, { useEffect, useState } from "react";
import { Box, Textarea, Button, Tooltip, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { SketchPicker } from "react-color";
import { db } from "../services/firestore";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { connect } from "react-redux";
import { getUserDataLocal } from "../services/localStorage";

function CreateNote(props) {
  const initState = {
    title: "",
    note: "",
    bg: "brand.400",
  };
  const [noteData, setNoteData] = useState(initState);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [isOpenPelette, setOpenPelette] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(getUserDataLocal());

  const toast = useToast();
  const clearState = () => {
    setNoteData({ ...initState });
  };

  //style
  const boxBorder = {
    border: "1px dashed",
    borderColor: "brand.50",
    padding: "0.75rem",
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  const msgAlert = (status, msgTitle, msgDesc) => {
    toast({
      title: msgTitle,
      description: msgDesc,
      status: status,
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (currentNoteId) {
      debugger;
      try {
        const reffUpdate = doc(
          db,
          "DataNotes",
          user.uid,
          "Notes",
          currentNoteId
        );

        await updateDoc(reffUpdate, {
          title: noteData.title,
          note: noteData.note,
          bg: noteData.bg,
          updated: Timestamp.now(),
        })
          .then(() => {
            msgAlert("success", "Success", "Data Saved");
            clearState();
            setCurrentNoteId(null);
            setLoading(false);
          })
          .catch((error) => {
            msgAlert("error", "error", error);
            setLoading(false);
          });
      } catch (error) {
        msgAlert("error", "error", "error");
      }
    } else {
      try {
        await addDoc(collection(db, "DataNotes", user.uid, "Notes"), {
          title: noteData.title,
          note: noteData.note,
          bg: noteData.bg,
          created: Timestamp.now(),
        })
          .then(() => {
            msgAlert("success", "Success", "Data Saved");
            setCurrentNoteId(null);
            clearState();
            setLoading(false);
          })
          .catch((error) => {
            msgAlert("error", "error", error);
            setLoading(false);
          });
      } catch (err) {
        msgAlert("error", "error", "error");
      }
    }
  };

  // const onGetDataById = (datas) => {
  //   let newData = datas.data;
  //   setNoteData({
  //     title: newData.title,
  //     note: newData.note,
  //     bg: newData.bg,
  //   });
  //   setCurrentNoteId(datas.id);
  // };

  const openPalette = () => {
    setOpenPelette(true);
  };

  const closePalette = () => {
    setOpenPelette(false);
  };

  const hanldeChangeBg = (color) => {
    setNoteData({ ...noteData, bg: color.hex });
  };

  const hanldeChangeComplateBg = (color) => {
    setNoteData({ ...noteData, bg: color.hex });
  };

  useEffect(() => {
    if (props.detailNote) {
      setNoteData({
        title: props.detailNote.data.title,
        note: props.detailNote.data.note,
        bg: props.detailNote.data.bg,
      });
      setCurrentNoteId(props.detailNote.id);
    }

    return () => {
      // clearState();
    };
  }, [props.detailNote]);

  return (
    // <Box sx={boxBorder} className="create" w={{ md: "35%" }} h={"max-content"}>
    <Box
      display={"inline-block"}
      w={{ sm: "100%", md: "50%", lg: "35%" }}
      h={"max-content"}
    >
      <Box
        sx={boxBorder}
        borderTopRightRadius={"12px"}
        borderTopLeftRadius={"12px"}
        className="create"
        fontFamily="Handlee"
        bg={noteData.bg}
      >
        <Textarea
          resize="vertical"
          size="lg"
          border={0}
          _focus={{ outline: "none" }}
          //color="brand.400"
          color="black"
          placeholder="Title..."
          //required={"true"}
          value={noteData.title}
          onChange={(e) =>
            setNoteData({
              ...noteData,
              title: e.target.value,
            })
          }
        />

        <Textarea
          resize="vertical"
          size="lg"
          border={0}
          //color="brand.400"
          color="black"
          _focus={{ outline: "none" }}
          rows="10"
          placeholder="Notes..."
          //required={"true"}
          value={noteData.note}
          onChange={(e) =>
            setNoteData({
              ...noteData,
              note: e.target.value,
            })
          }
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={boxBorder}
        borderBottomRightRadius={"12px"}
        borderBottomLeftRadius={"12px"}
      >
        <Box>
          <Tooltip hasArrow label="Save Note">
            <Button
              colorScheme="brand"
              variant="outline"
              border={"1px dashed"}
              onClick={submit}
              mr={1}
              disabled={isLoading}
            >
              Save
            </Button>
          </Tooltip>
          <Tooltip hasArrow label="Cancel">
            <Button
              colorScheme="brand"
              variant="solid"
              border={"1px dashed"}
              onClick={() => {
                clearState();
              }}
            >
              Cancel
            </Button>
          </Tooltip>
        </Box>
        <Tooltip hasArrow label="Choose background color">
          <Box>
            <Button
              colorScheme="brand"
              variant="outline"
              border={"1px dashed"}
              onClick={openPalette}
            >
              <FontAwesomeIcon icon={faPalette} />
            </Button>
            {isOpenPelette ? (
              <Box sx={popover}>
                <Box sx={cover} onClick={closePalette} />
                <SketchPicker
                  color={noteData.bg}
                  onChangeComplete={hanldeChangeComplateBg}
                  onChange={hanldeChangeBg}
                />
              </Box>
            ) : null}
          </Box>
        </Tooltip>
      </Box>
    </Box>
    //</Box>
  );
}

const mapStateToProps = (state) => {
  // debugger;
  return {
    detailNote: state.detailNote,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setBgNotes: (data) => dispatch({ type: "SET_BGNOTES", data }),
//   };
// };
export default connect(mapStateToProps)(CreateNote);
