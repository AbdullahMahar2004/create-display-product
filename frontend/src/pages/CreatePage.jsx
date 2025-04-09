import { useColorModeValue } from '@/components/ui/color-mode';
import { Container,  VStack, Heading, Box,Button  } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import { Input } from "@chakra-ui/react";
import { useState } from 'react'
import useProductStore from '../store/products'; // Import Zustand store

const Createpage = () => {
  const { addProduct } = useProductStore(); // Get Zustand action
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const handleAddProduct = async() => {
   
    const {success} = await addProduct(newProduct); // Call Zustand function that makes API request
    if (success) {
      toast.success('Product added successfully')
    }
     else if(!success) {
      toast.error('Please fill all fields');
    }
    setNewProduct({ name: '', price: '', image: '' }); // Clear input fields
    return;
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as = {'h1'} size={"2xl"}textAlign={"center"} mb={8}>Create a new product</Heading>
        <Box w='50%' bg ={useColorModeValue("gray.500,gray.200")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={6}>
          <Input 
            placeholder='Product Name'
            name = 'name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input 
            placeholder='Price'
            name = 'price'
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          />
          <Input 
            placeholder='Image URL'
            name = 'image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />
          <Button bgColor={'blue.900'} onClick={handleAddProduct} w='50%'>Create</Button>
          </VStack>
        </Box>

      </VStack>
    </Container>
  )
}

export default Createpage