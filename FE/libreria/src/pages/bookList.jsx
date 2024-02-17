import React, { useState, useEffect } from "react";
import { getBooks } from "../API/apiService";
import { Box, Alert, AlertIcon, Flex, Spacer } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [noBookFound, setNoBookFound] = useState(false);

  const { user } = useParams();

  useEffect(() => {
    getBooks(user)
      .then((res) => {
        if (res.length === 0) {
          setNoBookFound(true);
        } else {
          setBooks(res);
        }
      })
      .catch((error) => {
        setNoBookFound(true);
      });
  }, []);

  return (
    <Box textAlign="center">
      <Flex>
        <Box p="4" bg="red.400">
          Logo
        </Box>
        <Spacer />
        <Box p="4" bg="green.400">
          LogOut
        </Box>
      </Flex>
      {noBookFound && (
        <Alert status="warning" rounded="md" mb={4}>
          <AlertIcon />
          No book found in the database. Add a new book!
        </Alert>
      )}
      <Box
        bg="tomato"
        p={4}
        display="flex"
        justifyContent="center"
        flexDir="row"
      >
        {books.map((book) => (
          <div key={book.id}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.description}</p>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default BookList;
