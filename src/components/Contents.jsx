import React, { Component, useEffect, useState } from 'react'
import { Box, Textarea, Button, Tooltip, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { SketchPicker, ChromePicker } from 'react-color';

import db from "../services/firestore";
import ListNote from './ListNote'


export default function Contents() {

    const [noteDetail, setNoteDetail] = useState({});
    const [noteId, setNoteId] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDesc, setNoteDesc] = useState("");
    const [noteBg, setNoteBg] = useState("brand.400");
    const toast = useToast();
    const [isOpenPelette, setOpenPelette] = useState(false);


    let userID = localStorage.getItem("UserID");

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
        try {
            if (noteId) {
                db.collection("DataNotes").doc(userID).collection("Notes").doc(noteId).update({
                    title: noteTitle,
                    note: noteDesc,
                    bg: noteBg
                })
                    .then(() => {
                        msgAlert('success', 'Success', 'Data Saved');
                        setNoteTitle("");
                        setNoteDesc("");
                        setNoteId("");
                        setNoteBg("brand.400");
                    })
                    .catch((error) => {
                        msgAlert('error', 'error', error);
                    })
            } else {
                db.collection("DataNotes").doc(userID).collection("Notes").add({
                    title: noteTitle,
                    note: noteDesc,
                    bg: noteBg
                })
                    .then(() => {
                        msgAlert('success', 'Success', 'Data Saved');
                        setNoteTitle("");
                        setNoteDesc("");
                        setNoteId("");
                        setNoteBg("brand.400");
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
        setNoteDetail(newData);
        setNoteId(datas.id);
        setNoteTitle(newData.title);
        setNoteDesc(newData.note);
    }

    const openPalette = () => {
        setOpenPelette(true)
    }

    const closePalette = () => {
        setOpenPelette(false)
    }

    const hanldeChangeBg = (color) => {
        setNoteBg(color.hex)
    }

    const hanldeChangeComplateBg = (color) => {
        setNoteBg(color.hex)
    }

    //style
    const boxBorder = {
        border: '1px dashed',
        borderColor: 'brand.50',
        padding: '0.75rem'
    }

    const popover = {
        position: 'absolute',
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
                    bg={noteBg} >
                    <Textarea
                        resize="vertical"
                        size="lg"
                        border={0}
                        _focus={{ outline: 'none' }}
                        //color="brand.400"
                        color="black"
                        placeholder='Title...'
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)} />

                    <Textarea
                        resize="vertical"
                        size="lg"
                        border={0}
                        //color="brand.400"
                        color="black"
                        _focus={{ outline: 'none' }}
                        rows='10'
                        placeholder='Notes...'
                        value={noteDesc}
                        onChange={(e) => setNoteDesc(e.target.value)} />
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={'space-between'}
                    sx={boxBorder}
                    borderBottomRightRadius={'12px'}
                    borderBottomLeftRadius={'12px'}>
                    <Box>
                        <Tooltip hasArrow label='Save Note'>
                            <Button colorScheme='brand' variant='outline' border={'1px dashed'} onClick={submit} mr={1}>
                                Save
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label='Cancel'>
                            <Button colorScheme='brand' variant='solid' border={'1px dashed'} onClick={() => {
                                setNoteTitle("");
                                setNoteDesc("");
                                setNoteDetail("");
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
                            {isOpenPelette ? <Box sx={popover}>
                                <Box sx={cover} onClick={closePalette} />
                                <SketchPicker
                                    color={noteBg}
                                    onChangeComplete={hanldeChangeComplateBg}
                                    onChange={hanldeChangeBg} />
                            </Box> : null}
                        </Box>
                    </Tooltip>
                </Box>
            </Box>

            <ListNote onCounterChange={(value) => onGetDataById(value)} />

            {/* <CreateNote/>
                <Spacer />
                <ListNote/> */}
        </Box >
    )

}
