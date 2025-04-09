import { Container, Flex, HStack, Button } from '@chakra-ui/react';
import { useColorMode } from '@/components/ui/color-mode';
import { Link } from 'react-router-dom';
import { PlusSquareIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Fixed function name

  return (
    <Container maxW="1140px" p={4} >
      <Flex minH="60px" justifyContent={"space-between"} alignItems={"center"} flexDir={{ base: "column", sm: "row" }}>
        <Link
          to="/"
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
            backgroundImage: "linear-gradient(to right, rgb(10, 4, 65), rgb(19, 117, 238))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
          >
        Product Store
        </Link>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
