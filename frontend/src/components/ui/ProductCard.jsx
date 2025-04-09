import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Image, Text, useDisclosure, VStack, Input, Button } from "@chakra-ui/react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import useProductStore from '../../store/products'; // Corrected import path
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast
import { useState } from 'react'; // Import useState from react
import { useColorModeValue } from '@/components/ui/color-mode';

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();
  const { open, onOpen, onClose } = useDisclosure();
  const { updateProduct } = useProductStore();
    const [updatedProduct, setupdatedProduct] = useState(product);
  const handleupdateProduct = async (id,product) => {
    const { success } = await updateProduct(id,product);
    if (success) {
        toast.success('Product updated successfully');
    } else {
        toast.error('Error updating product');
    }
    onClose();
    };

  const handleDelete = async (id) => {
    console.log(id);
    const { success } = await deleteProduct(id);
    if (success) {
      toast.success('Product deleted successfully');
    } else {
      toast.error('Error deleting product');
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl"
      }}>
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
        <Heading as="h3" fontSize={"md"}>{product.name}</Heading>
        <Text fontSize={"xl"} fontWeight={'bold'}>${product.price}</Text>
        <HStack spacing={3}>
          <Button onClick={onOpen}>
            <EditIcon fontSize={20} />
          </Button>
          <Button onClick={() => handleDelete(product._id)}>
            <DeleteIcon fontSize={20} />
          </Button>
        </HStack>
      </Box>
        <Modal isOpen={open} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(10px)"  />
        <ModalContent
          w="90%" 
          maxW="600px" 
          bg="gray.700" 
          
          borderRadius="lg" 
          color="white" 
          p={6} 
          textAlign={'center'}
          mx="auto"
          mt="20vh" // Moves the modal lower
                >
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" justifyContent="center" alignItems="center">
                    <VStack spacing={4} w="full">
                      <Box w='90%' bg ={useColorModeValue("gray.800,gray.200")} p={6} rounded={"lg"} shadow={"md"}>
                      <Input placeholder='Product Name' name='name' bg="grey.800" color="black"
                      value={updatedProduct.name}
                      onChange={(e) => setupdatedProduct({...updatedProduct,name : e.target.value})}  />
                      <Input placeholder='Price' name='price' bg="grey.800" color="black"
                      value={updatedProduct.price} 
                      onChange={(e) => setupdatedProduct({...updatedProduct,price : e.target.value})}/>
                      <Input placeholder='Image URL' name='image' bg="grey.800" color="black"
                      value={updatedProduct.image} 
                      onChange={(e) => setupdatedProduct({...updatedProduct,image : e.target.value})}/>
                      </Box>
                    </VStack>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() =>handleupdateProduct(product._id,updatedProduct)}>Update</Button>
                <Button variant={'ghost'} onClick={onClose} bgColor={'Background'}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  );
};

export default ProductCard;