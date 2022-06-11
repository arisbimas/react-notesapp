import React, { useEffect, useState } from 'react'
import { Box, Textarea, Button, Tooltip } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'

import db from "../services/firestore";

export default function CreateNote() {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDesc, setNoteDesc] = useState("");

    let userID = localStorage.getItem("UserID");

    useEffect(() => {
        let noteDetail = localStorage.getItem('note-detail');
        // setUserNoteData(
        //     snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         data: doc.data(),
        //     }))
        // );
        console.log(noteDetail);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        db.collection("DataNotes").doc(userID).collection("Notes").add({
            title: noteTitle,
            note: noteDesc,
        });
        setNoteTitle("");
        setNoteDesc("");
    };

    const boxBorder = {
        border: '1px dashed',
        borderColor: 'brand.50',
        borderRadius: '12px',
        padding: '0.75rem'
    }
    return (
        <Box sx={boxBorder} className='create' w={{ md: '35%' }} h={'max-content'} >
            <Textarea resize="vertical" size="lg" fontFamily="Caveat Brush" placeholder='Title...' border={0} _focus={{ outline: 'none' }} color="brand.400"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)} />

            <Textarea resize="vertical" size="lg" fontFamily="Caveat Brush" placeholder='Notes...' border={0} _focus={{ outline: 'none' }} rows='10' color="brand.400"
                value={noteDesc}
                onChange={(e) => setNoteDesc(e.target.value)} />

            <Box display={"flex"} justifyContent={'space-between'} mt="10">
                <Tooltip hasArrow label='Save Note'>
                    <Button colorScheme='brand' variant='outline' border={'1px dashed'} onClick={submit}>
                        Save
                    </Button>
                </Tooltip>
                <Tooltip hasArrow label='Choose color backgound note'>
                    <Button colorScheme='brand' variant='outline' border={'1px dashed'}>
                        <FontAwesomeIcon icon={faPalette} />
                    </Button>
                </Tooltip>
            </Box>
        </Box>
    )
}
