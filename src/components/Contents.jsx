import React, { Component, useEffect, useState } from 'react'
import { Box, Textarea, Button, Tooltip } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'

import db from "../services/firestore";
import ListNote from './ListNote'


export default function Contents() {

    const [noteDetail, setNoteDetail] = useState({});
    const [noteId, setNoteId] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDesc, setNoteDesc] = useState("");

    let userID = localStorage.getItem("UserID");

    const submit = (e) => {
        e.preventDefault();
        if (noteId) {
            db.collection("DataNotes").doc(userID).collection("Notes").doc(noteId).update({
                title: noteTitle,
                note: noteDesc,
            });
        } else {
            db.collection("DataNotes").doc(userID).collection("Notes").add({
                title: noteTitle,
                note: noteDesc,
            });
        }
        setNoteTitle("");
        setNoteDesc("");
        setNoteId("");
    };

    const onGetDataById = (datas) => {
        let newData = datas.data;
        setNoteDetail(newData);
        setNoteId(datas.id);
        setNoteTitle(newData.title);
        setNoteDesc(newData.note);
    }

    //style
    const boxBorder = {
        border: '1px dashed',
        borderColor: 'brand.50',
        borderRadius: '12px',
        padding: '0.75rem'
    }

    return (
        <Box p={4} pt={125} display={{ md: 'flex' }} h={'max-content'}>
            <Box sx={boxBorder} className='create' w={{ md: '35%' }} h={'max-content'} fontFamily="Handlee" >
                <Textarea resize="vertical" size="lg" placeholder='Title...' border={0} _focus={{ outline: 'none' }} color="brand.400"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)} />

                <Textarea resize="vertical" size="lg" placeholder='Notes...' border={0} _focus={{ outline: 'none' }} rows='10' color="brand.400"
                    value={noteDesc}
                    onChange={(e) => setNoteDesc(e.target.value)} />

                <Box display={"flex"} justifyContent={'space-between'} mt="10">
                    <Box>
                        <Tooltip hasArrow label='Save Note'>
                            <Button colorScheme='brand' variant='outline' border={'1px dashed'} onClick={submit} mr={1}>
                                Save
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label='Cancel'>
                            <Button colorScheme='brand' variant='solid' border={'1px dashed'} onClick={()=>{
                                setNoteTitle("");
                                setNoteDesc("");
                                setNoteDetail("");
                            }}>
                                Cancel
                            </Button>
                        </Tooltip>
                    </Box>
                    <Tooltip hasArrow label='Choose color backgound note'>
                        <Button colorScheme='brand' variant='outline' border={'1px dashed'}>
                            <FontAwesomeIcon icon={faPalette} />
                        </Button>
                    </Tooltip>
                </Box>
            </Box>

            <ListNote onCounterChange={(value) => onGetDataById(value)} />

            {/* <CreateNote/>
                <Spacer />
                <ListNote/> */}
        </Box>
    )

}
