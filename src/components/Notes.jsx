import React, { Component } from 'react'
import { Box, Spacer } from '@chakra-ui/react'
import CreateNote from './CreateNote'
import ListNote from './ListNote'

export default class Notes extends Component {
    render() {
        return (
            <Box p={4} pt={125}  display={{ md: 'flex' }} h={'max-content'}>
                <CreateNote/>
                <Spacer />
                <ListNote/>
            </Box>
        )
    }
}
