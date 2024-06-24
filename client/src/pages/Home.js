import { Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"blackAlpha.900"}
            height={"100vh"}
            flexDir={"column"}
            gap={10}
        >
            <Text color={"white"} fontSize={50} fontWeight={700}>Free Games API</Text>
            <Link to={"/login"}>
                <Button>Entrar</Button>
            </Link>
        </Flex>
    );
}

export default Home;