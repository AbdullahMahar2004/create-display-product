import { Container,SimpleGrid,Text, VStack } from "@chakra-ui/react"
import useProductStore from '../store/products'; // Import Zustand store
import { Link } from "react-router-dom"
import { useEffect } from "react";
import ProductCard from '@/components/ui/ProductCard';

const Homepage = () => {
  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  return (
    <Container maxW="container.xl" py = {12}>
      <VStack spacing={8}>
        <Text 
          fontSize={"3xl"}
          fontWeight={"bold"}
          bgGradient={"linear-gradient(to right, rgb(29, 16, 152), rgb(65, 143, 238))" }
          bgClip={"text"}
          textAlign={"center"}
        >Current Products
        </Text>
        <SimpleGrid 
        columns={[1, 2, 3]} spacing={10}
        w={"100%"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <>
            <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} bgGradient={"linear-gradient(to right, rgb(89, 16, 103), rgb(214, 63, 231))"} bgClip={"text"}>
              No Products Available
            </Text>
            <Link to="/create">
              <Text 
                fontSize={"l"}
                fontWeight={"bold"}
                bgGradient={"linear-gradient(to right, rgb(115, 105, 200), rgb(134, 20, 147))"}
                bgClip={"text"}
                textAlign={"center"}
              >Create Product
              </Text>        
            </Link>
          </>
        )}
      </VStack>
    </Container>
  )
}

export default Homepage