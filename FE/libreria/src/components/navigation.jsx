import { Box, Flex, Button } from "@chakra-ui/react"
import { Logo } from "../assets/logo"
import { useNavigate } from "react-router-dom"
const Navigation = () => {

    const navigate = useNavigate();

    return(
        <Box p={4}>
                 <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box w={{ base: "30px", md: "70px" }} m={3}>
          <Logo />
        </Box>
    
        
      <Button
                  colorScheme="green"
                  onClick={() => navigate('/')}
                >
                  LogOut
                </Button>
     
      </Flex>
        </Box>
    )

}

export default Navigation