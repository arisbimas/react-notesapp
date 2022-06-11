import React, { Component } from 'react'
import { Box, Flex, Spacer, Heading, ButtonGroup, Button, LinkBox, Link, LinkOverlay, Stack, useColorModeValue, useColorMode, useDisclosure, Img } from '@chakra-ui/react'
import { EditIcon, AttachmentIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import ImgBrand from '../assets/imgbrand1.png'


export function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const styBtn = {
        bg: 'none',
        _hover: "none"
    }

    return (
        <>
            <Box bg={useColorModeValue('brand.500', 'gray.900')} px={[2, 4, 6, 10]} mb={5} pos='fixed' w="100%" zIndex="100">
                <Flex h={28} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Heading as="a" href='#' size='md' fontFamily="Dancing Script" fontSize="3xl">
                            <Img src={ImgBrand} maxW="14%"></Img>
                        </Heading>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={2} border="none">
                            {/* <Button sx={styBtn}>
                                <EditIcon></EditIcon>
                            </Button>
                            <Button sx={styBtn}>
                                <AttachmentIcon></AttachmentIcon>
                            </Button> */}
                            <Button onClick={toggleColorMode} sx={styBtn}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
        // <div className="header">
        //     <div className="header-content">
        //         <Flex minWidth='max-content' alignItems='center' gap='2'>
        //             <Box p='2'>
        //                 <Heading as="a" href='#' size='md' fontFamily="Dancing Script" fontSize="3xl">Notes</Heading>
        //             </Box>
        //             <Spacer />
        //             <ButtonGroup gap='2'>
        //                 <LinkBox>Box</LinkBox>
        //                 <Link>Link</Link>
        //                 <LinkOverlay>Overlay</LinkOverlay>
        //                 <EditIcon></EditIcon>
        //                 <AttachmentIcon></AttachmentIcon>
        //             </ButtonGroup>
        //         </Flex>
        //     </div>

        // </div>

    )
}

