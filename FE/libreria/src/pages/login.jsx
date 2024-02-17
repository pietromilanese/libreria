import React, { useState, useEffect } from "react";
import { Alert, AlertIcon, Box, Center, Heading } from "@chakra-ui/react";
import { getUsers } from "../API/apiService";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [users, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [noUsersFound, setNoUsersFound] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedUser) {
      // Redirect to the books page with the selected userId
      navigate(`/books/${selectedUser}`);
    } else {
      // Handle the case where no user is selected
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res.length === 0) {
        setNoUsersFound(true);
      } else {
        setUser(res);
      }
    });
  }, []);

  return (
    <Center h="100vh">
      <Box
        textAlign="center"
        w={300}
        boxShadow="xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Heading as="h1" size="lg" p={4} m={4}>
          Log-in to your account
        </Heading>
        {noUsersFound && (
          <Alert status="warning" rounded="md" mb={4}>
            <AlertIcon />
            No users found in the database.
          </Alert>
        )}

        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          placeholder="Choose an account"
          mb={4}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </Select>
        <Button mt={4} colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
        {showAlert && (
          <Alert status="error" mt={4} rounded="md">
            <AlertIcon />
            Please select an account
          </Alert>
        )}
      </Box>
    </Center>
  );
};

export default Login;
