import React from "react";
import { Box, Button, Input } from '@chakra-ui/react'

export const Mainscreen = () => {

    return(
        <Box p={4} h={8} mt={2}>
            <Input placeholder='Username...' mt={4} type='text'/>
            <Input placeholder='Email...' mt={4} type='email'/>
            <Input placeholder='Password...' mt={4} type='password'/>
            <Button colorScheme='blue' mt={4}>
                Register
            </Button>
            <Button colorScheme='blue' mt={4} ml={4}>
                Login
            </Button>
        </Box>
    )
}