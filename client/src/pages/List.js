import { Badge, Box, Button, Card, CardBody, CardFooter, Flex, Img, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner, Select } from '@chakra-ui/react'

const CATEGORYLIST = [
    "mmorpg", "shooter", "anime", "strategy", "fantasy", "sci-fi", "racing", "social", "sports"
]


const List = () => {

    const [games, setGames] = useState([])
    const [category, setCategory] = useState("mmorpg")
    const [loading, setLoading] = useState()

    const getGames = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:5000/api/games/${category}`)
            setGames(response.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleOnChangeCategory = (event) => {
        setCategory(event.target.value)
    }

    useEffect(() => {
        getGames()
    }, [])

    useEffect(() => {
        getGames()
    }, [category])


    return (
        <Box height={"auto"} backgroundColor={"blackAlpha.900"}>
            <Flex
                width={"100%"}
                height={100}
                backgroundColor={"gray.700"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Select
                    width={300}
                    backgroundColor={"white"}
                    borderColor={"black"}
                    borderWidth={3}
                    onChange={handleOnChangeCategory}
                    value={category}
                    isDisabled={loading}
                >
                    {CATEGORYLIST.map((categoria, index) => {
                        return <option value={categoria} key={index}>{categoria}</option>
                    })}
                </Select>
            </Flex>
            <Flex wrap={"wrap"} gap={5} justifyContent={"center"} padding={10}>
                {loading ?
                    <Flex height={"100vh"}>
                        <Spinner size='xl' color="white" />
                    </Flex>
                    : games.map((game) => {
                        return (
                            <Link to={"/info/" + game.id} key={game.id}>
                                <Card backgroundColor={"gray.900"} width={270} height={230}>
                                    <CardBody padding={0}>
                                        <Img src={game.thumbnail} />
                                        <Box padding={2} height={45}>
                                            <Text color={"white"} fontWeight={500} fontSize={15}>{game.title}</Text>
                                        </Box>
                                    </CardBody>
                                    <CardFooter padding={2}>
                                        <Badge fontSize={10} colorScheme="blue">{game.platform}</Badge>
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    })
                }
            </Flex>
        </Box>
    );
}

export default List;