import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'

const Game = () => {

    const { id } = useParams();

    const [game, setGame] = useState()

    const [requirements, setRequirements] = useState({
        os: "?",
        processor: "?",
        memory: "?",
        graphics: "?",
        storage: "?"
    })

    const [images, setImages] = useState([])

    const getGame = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/game/${id}`)
            console.log(response.data)
            setGame(response.data)
            if (response.data.platform !== "Web Browser") setRequirements(response.data.minimum_system_requirements)
            if (response.data.screenshots) setImages(response.data.screenshots)
        } catch (error) {
            console.log(error)
        }

    }



    useEffect(() => {
        getGame()
    }, [])


    if (!game) {
        return (
            <Flex width={"100%"} height={"100vh"} backgroundColor={"blackAlpha.900"} justifyContent={"center"}>
                <Spinner size='xl' color="white" />
            </Flex>
        )
    }

    return (
        <Box backgroundColor={'blackAlpha.900'} height={2000} padding={10}>
            <Flex direction={"column"}>
                <Text color={"white"} fontSize={30} fontWeight={700}>{game.title}</Text>
                {images.length > 0 ?
                    <Image
                        src={images[0].image}
                        height={600}
                        borderStyle={"solid"}
                        borderWidth={3}
                        borderColor={"white"}
                    />
                    : <Box></Box>}
                <Box>
                    <Flex direction={"row"}>
                        {images.length > 0 ? game.screenshots.map((image, index) => {
                            return (
                                <Image
                                    width={300}
                                    height={150}
                                    borderStyle={"solid"}
                                    borderWidth={3}
                                    borderColor={"white"}
                                    key={index}
                                    src={image.image}
                                />
                            )
                        })
                            : <Box></Box>}

                    </Flex>
                </Box>
                <Text marginBlock={10} color={"white"} fontWeight={400}>
                    {game.description}
                </Text>
            </Flex>

            <Flex direction={"row"} justifyContent={"space-around"}>
                <Box
                    color={"grey"}
                    fontWeight={400}
                    borderStyle={"solid"}
                    borderWidth={2}
                    borderColor={"gray"}
                    padding={5}>
                    <Text fontSize={20} fontWeight={500}>Informações gerais:</Text>
                    <Text>Gênero: {game.genre}</Text>
                    <Text>Plataforma: {game.platform}</Text>
                    <Text>Publicado por: {game.publisher}</Text>
                    <Text>Desenvolvedor: {game.developer}</Text>
                    <Text>Lançamento: {game.release_date}</Text>
                </Box>

                <Box color={"grey"}
                    fontWeight={400}
                    borderStyle={"solid"}
                    borderWidth={2}
                    borderColor={"gray"}
                    padding={5}>
                    <Text fontSize={20} fontWeight={500}>Requisitos de sistema:</Text>
                    <Text>Sistema operacional: {requirements.os}</Text>
                    <Text>Processador: {requirements.processor}</Text>
                    <Text>Memória RAM: {requirements.memory}</Text>
                    <Text>Placa de vídeo: {requirements.graphics}</Text>
                    <Text>Espaço: {requirements.storage}</Text>
                </Box>
            </Flex>
            <Flex direction={"row"} justifyContent={"center"} marginBlock={20}>
                <Link to={game.game_url}>
                    <Button
                        colorScheme="green"
                        width={200} height={50}
                    >Download
                    </Button>
                </Link>

            </Flex>

        </Box>
    );
}

export default Game;