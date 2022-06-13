import React, { Component, useEffect, useState } from 'react'
import { Box, Textarea, Button, Tooltip, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { SketchPicker, ChromePicker } from 'react-color';

import db from "../services/firestore";
import ListNote from './ListNote'


export default function Contents() {

    const initState = {
        title: "",
        note: "",
        bg: "brand.400"
    }
    const [noteData, setNoteData] = useState(initState);
    const [currentNoteId, setCurrentNoteId] = useState("");
    const [isOpenPelette, setOpenPelette] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    let userID = localStorage.getItem("UserID");

    const clearState = () => {
        setNoteData({ ...initState });
    };

    const msgAlert = (status, msgTitle, msgDesc) => {
        toast({
            title: msgTitle,
            description: msgDesc,
            status: status,
            duration: 9000,
            isClosable: true,
        })
    }

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentNoteId) {
                db.collection("DataNotes").doc(userID).collection("Notes").doc(currentNoteId).update({
                    title: noteData.title,
                    note: noteData.note,
                    bg: noteData.bg
                })
                    .then(() => {
                        msgAlert('success', 'Success', 'Data Saved');
                        clearState();
                        setCurrentNoteId("");
                        setLoading(false);
                    })
                    .catch((error) => {
                        msgAlert('error', 'error', error);
                    })
            } else {
                db.collection("DataNotes").doc(userID).collection("Notes").add({
                    title: noteData.title,
                    note: noteData.note,
                    bg: noteData.bg
                })
                    .then(() => {
                        msgAlert('success', 'Success', 'Data Saved');
                        setCurrentNoteId("");
                        clearState(); 
                        setLoading(false);
                    })
                    .catch((error) => {
                        msgAlert('error', 'error', error);
                    });
            }
        } catch (error) {
            msgAlert('error', 'error', 'error');
        }

    };

    const onGetDataById = (datas) => {
        let newData = datas.data;
        setNoteData({
            title: newData.title,
            note: newData.note,
            bg: newData.bg
        })
        setCurrentNoteId(datas.id);
    }

    const openPalette = () => {
        setOpenPelette(true)
    }

    const closePalette = () => {
        setOpenPelette(false)
    }

    const hanldeChangeBg = (color) => {
        setNoteData({ ...noteData, bg: color.hex })
    }

    const hanldeChangeComplateBg = (color) => {
        setNoteData({ ...noteData, bg: color.hex })
    }

    //style
    const boxBorder = {
        border: '1px dashed',
        borderColor: 'brand.50',
        padding: '0.75rem'
    }

    const popover = {
        // position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    return (
        <Box p={4} pt={125} display={{ md: 'flex' }} h={'max-content'}>
            <Box
                display={"inline-block"}
                w={{ sm: '100%', md: '50%', lg: '35%' }}
                h={'max-content'}>
                <Box
                    sx={boxBorder}
                    borderTopRightRadius={'12px'}
                    borderTopLeftRadius={'12px'}
                    className='create'
                    fontFamily="Handlee"
                    bg={noteData.bg} >
                    <Textarea
                        resize="vertical"
                        size="lg"
                        border={0}
                        _focus={{ outline: 'none' }}
                        //color="brand.400"
                        color="black"
                        placeholder='Title...'
                        required="true"
                        value={noteData.title}
                        onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />

                    <Textarea
                        resize="vertical"
                        size="lg"
                        border={0}
                        //color="brand.400"
                        color="black"
                        _focus={{ outline: 'none' }}
                        rows='10'
                        placeholder='Notes...'
                        required="true"
                        value={noteData.note}
                        onChange={(e) => setNoteData({ ...noteData, note: e.target.value })} />
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={'space-between'}
                    sx={boxBorder}
                    borderBottomRightRadius={'12px'}
                    borderBottomLeftRadius={'12px'}>
                    <Box>
                        <Tooltip hasArrow label='Save Note'>
                            <Button colorScheme='brand' variant='outline' border={'1px dashed'} onClick={submit} mr={1} disabled={isLoading}>
                                Save
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label='Cancel'>
                            <Button colorScheme='brand' variant='solid' border={'1px dashed'} onClick={() => {
                                clearState(); 
                            }}>
                                Cancel
                            </Button>
                        </Tooltip>
                    </Box>
                    <Tooltip hasArrow label='Choose background color'>
                        <Box>
                            <Button colorScheme='brand' variant='outline' border={'1px dashed'} onClick={openPalette}>
                                <FontAwesomeIcon icon={faPalette} />
                            </Button>
                            {isOpenPelette ? <Box sx={popover} pos={{ sm: "relative", md: "absolute" }}>
                                <Box sx={cover} onClick={closePalette} />
                                <SketchPicker
                                    color={noteData.ng}
                                    onChangeComplete={hanldeChangeComplateBg}
                                    onChange={hanldeChangeBg} />
                            </Box> : null}
                        </Box>
                    </Tooltip>
                </Box>
            </Box>

            <ListNote onSelectNote={(value) => onGetDataById(value)} />
        </Box >
    )

}
