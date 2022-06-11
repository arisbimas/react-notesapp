import React, { useEffect, useState } from 'react'
import {
    Box,
    Text,
    useColorModeValue,
    Divider,
    Flex,
    Tooltip,
    Img,
    Center,
} from '@chakra-ui/react';
import ImgNoData from '../assets/nodata.svg'

import db from "../services/firestore";

export default function ListNote() {

    const [userNoteData, setUserNoteData] = useState([]);
    let userID = localStorage.getItem("UserID");
    useEffect(() => {
        db.collection("DataNotes/" + userID + "/Notes").onSnapshot((snapshot) => {
            setUserNoteData(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
        console.log({ userNoteData });
    }, []);


    const container = {
        display: "flex",
        flexWrap: "wrap",
        margin: "0 5px",
        justifyContent: "space-evenly"
    }

    const box = {
        border: '1px dashed',
        borderColor: 'brand.50',
        borderRadius: '12px',
        padding: '0.75rem',
        display: 'block',
        letterSpacing: ".01428571em",
        fontSize: ".875rem",
        fontWeight: 400,
        lineHeight: "1.25rem",
        height: 'max-content',
        marginBottom: "10px",
        cursor: "pointer"
    }

    const bx = {
        /*important for dinamic box*/
        flex: "0 0 calc(33.33% - 10px)",
        margin: "5px",

        /*just for style box*/
        border: '1px dashed',
        borderColor: 'brand.50',
        borderRadius: '12px',
        padding: '0.75rem',
        letterSpacing: ".01428571em",
        fontSize: ".875rem",
        fontWeight: 400,
        lineHeight: "1.25rem",
        height: 'max-content',

        /*** Just to center the text ***/
        // display: "inline-flex",
        // justifyContent: "center",
        // alignItems: "center",
    }

    return (
        <Box w={{ md: '64%' }} mt={[5, 5, 0, 0]} display={{ md: 'block' }} h={'max-content'} fontFamily="Caveat Brush">
            <Box sx={container} className='listNote'>
                {
                    userNoteData.length >= 0 ? userNoteData.map(({ id, data }) => (
                        <Tooltip hasArrow label={data.title} key={data.id}>
                            <Box sx={box} w={["100%", "50%", "50%", "30%"]} mt={['10px', '0px']} bg={useColorModeValue('white', 'gray.800')} boxShadow={'xl'}>
                                <Text className='noteTitle' pb={"2"}>
                                    {data.title}
                                </Text>

                                <Divider />
                                <Box className='noteDesc' pt={3}>
                                    {data.note}
                                </Box>
                            </Box>
                        </Tooltip>


                        // <Box sx={bx} w={["200px", "300px"]} mt={['10px', '0px']} bg={useColorModeValue('white', 'gray.800')} boxShadow={'xl'}>
                        //     <Text className='noteTitle' pb={"2"}>
                        //         {data.title}
                        //     </Text>
                        //     <Divider />
                        //     <Box className='noteDesc' pt={3}>
                        //         {data.note}
                        //     </Box>
                        // </Box>

                    )) : <Center><Img src={ImgNoData} /></Center>
                }
            </Box>
        </Box>
    )
}
