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
    Button,
    ScaleFade,
} from '@chakra-ui/react';
import ImgNoData from '../assets/nodata.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import db from "../services/firestore";

export default function ListNote({ onCounterChange }) {

    const [userNoteData, setUserNoteData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [isLoading, setLoading] = useState(false)

    let userID = localStorage.getItem("UserID");
    useEffect(() => {
        setLoading(true);
        db.collection("DataNotes/" + userID + "/Notes").onSnapshot((snapshot) => {
            setUserNoteData(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
            setLoading(false)
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

    const disp = {
        display: "contents"
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
        <Box w={{ md: '64%' }} mt={[5, 5, 0, 0]} display={{ md: 'block' }} h={'max-content'} fontFamily="Handlee">
            <Box sx={container} className='listNote'>
                {
                    isLoading ?
                        <Center><Text className='noteTitle' pb={3} pr={9} fontWeight="bold">
                            Loadinggg...
                        </Text></Center>
                        :
                        <ScaleFade initialScale={0.9} in={!isLoading} className="displaycontents">
                            {
                                userNoteData.length > 0 ? userNoteData.map(({ id, data }) => (
                                    <Box display={"contents"}>
                                        <Box
                                            key={id}
                                            sx={box}
                                            w={["100%", "50%", "50%", "30%"]}
                                            mt={['10px', '0px']}
                                            bg={useColorModeValue('white', 'gray.800')}
                                            boxShadow={'xl'}
                                            pos="relative"
                                        >
                                            <Button colorScheme='brand' variant='outline' border={'none'} pos={"absolute"} top={1} right={1}
                                            onClick={()=>{
                                                alert('delete on develop')
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                            <Box
                                                onClick={() => {
                                                    let dataNoteDetail = userNoteData.filter(x => x.id == `${id}`);
                                                    if (dataNoteDetail.length >= 0) {
                                                        // console.log({ dataNoteDetail });
                                                        // localStorage.setItem("note-detail", JSON.stringify(dataNoteDetail[0]));
                                                        onCounterChange(dataNoteDetail[0])
                                                    } else {

                                                    }

                                                }}>
                                                <Text className='noteTitle' pb={3} pr={10} fontWeight="bold">
                                                    {data.title}
                                                </Text>
                                                <Divider />
                                                <Box className='noteDesc' pt={3}>
                                                    {data.note}
                                                </Box>
                                            </Box>

                                        </Box>
                                    </Box>
                                )) : <Center><Img src={ImgNoData} /></Center>
                            }
                        </ScaleFade>
                }
            </Box>
        </Box>
    )
}
