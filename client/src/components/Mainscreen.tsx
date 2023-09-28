import React, { useContext } from "react";
import { Box, Button, Input } from '@chakra-ui/react'
import { useState } from "react";
import AuthContext from "../store/AuthStore";

export const Mainscreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { auth } = useContext(AuthContext);

    const handleRegister = () => {
        auth.registerUser({
            username: username,
            email: email,
            password: password,
        });
    }

    const handleLogin = () => {
        auth.logInUser({
            email: email,
            password: password
        })
    }

    const handleLogout = () => {
        auth.logoutUser();
    }

    return(
        <Box p={4} h={8} mt={2}>
            <Input placeholder='Username...' mt={4} type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <Input placeholder='Email...' mt={4} type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <Input placeholder='Password...' mt={4} type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button colorScheme='blue' mt={4} onClick={handleRegister} disabled={auth.loggedIn}>
                Register
            </Button>
            <Button colorScheme='blue' mt={4} ml={4} onClick={handleLogin} disabled={auth.loggedIn}>
                Login
            </Button>
            <Button colorScheme='blue' mt={4} ml={4} onClick={handleLogout} disabled={!auth.loggedIn}>
                Logout
            </Button>
            <Box>
                <Box textAlign={"center"}>Current Status:</Box>
                <Box textAlign={"center"}>{`Loggedin: ${auth.loggedIn}`}</Box>
                <Box textAlign={"center"}>{`Username: ${auth.user?auth.user.username:''}`}</Box>
                <Box textAlign={"center"}>{`email: ${auth.user?auth.user.email:''}`}</Box>
            </Box>
        </Box>
    )
}