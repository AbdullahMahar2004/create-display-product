import { Box } from "@chakra-ui/react";
import {Route , Routes} from "react-router-dom";
import Homepage from "./pages/HomePage.jsx";
import Createpage from "./pages/CreatePage.jsx";
import Navbar from "./components/ui/Navbar";
import { useColorModeValue } from '@/components/ui/color-mode';

function App() {

  return (
    <Box minH = {"100vh"} bg = {useColorModeValue("gray.100", "gray.900")}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/create' element={<Createpage/>} />
      </Routes>
    </Box>
  );
}

export default App
