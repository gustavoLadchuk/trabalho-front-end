import { Link } from "react-router-dom";
import { useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Text,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { z } from "zod"


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const emailSquema = z.object({
        email: z.string().email()
    })

    const passwordSquema = z.object({
        password: z.string().min(8)
    })

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (p) => {
        setPassword(p.target.value)
    }

    const verifyEmail = () => {
        try {
            emailSquema.parse({ email })
            return false
        } catch (error) {
            return true
        }
    }

    const verifyPassword = () => {
        try {
            passwordSquema.parse({ password })
            return false
        } catch (error) {
            return true
        }
    }

    const handleClick = () => setShowPassword(!showPassword)

    const isEmailError = verifyEmail()
    const isPasswordError = verifyPassword()
    const isButtonDisabled = isEmailError || isPasswordError


    return (
        <Box w={"100%"} h={"100vh"} backgroundColor={"blackAlpha.900"} padding={35}>
            <Flex align={'center'} justify={"center"} flexDir={"column"}>

                <Box w={700} h={500} backgroundColor={'blackAlpha.700'} padding={10} color={'white'}>
                    <Flex flexDir={"column"} justify={"space-around"} align={"center"}>
                        <Text fontSize={30} fontWeight={"bolder"}>Login</Text>
                        <FormControl isInvalid={isEmailError}>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' value={email} onChange={handleEmailChange} />
                            {!isEmailError ? (
                                <FormHelperText>
                                    Insira seu Email
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Insira um email válido</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={isPasswordError}>
                            <FormLabel>Senha</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handlePasswordChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {!isPasswordError ? (
                                <FormHelperText>
                                    Insira sua senha
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Senha deve conter pelo menos 8 caracteres</FormErrorMessage>
                            )}
                        </FormControl>

                        <Link to={"/list"}>
                            <Button isDisabled={isButtonDisabled}>Entrar</Button>
                        </Link>

                    </Flex>
                </Box>

            </Flex >
        </Box >
    );
}

export default Login;

/* <div className="login-container">
                <div className="title">Login</div>
                <div className="input-container">
                    <label htmlFor="email" className="input-label">Email:</label>
                    <input type="email" id="email" className="input"></input>
                    <label htmlFor="password" className="input-label">Senha:</label>
                    <input type="password" id="password" className="input"></input>
                </div>
                <Link to={"/home"}>
                    <button className="login-button">Fazer login</button>
                </Link>
    </div> */