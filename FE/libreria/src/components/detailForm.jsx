import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { updateBook } from "../API/apiService";

const UpdateBookForm = ({
  userId,
  bookId,
  booktitle,
  bookauthor,
  bookisbn,
  bookdescription,
  booknumOfRead,
}) => {
  const [title, setTitle] = useState(booktitle);
  const [author, setAuthor] = useState(bookauthor);
  const [isbn, setISBN] = useState(bookisbn);
  const [description, setDescription] = useState(bookdescription);
  const [numOfRead, setNumOfRead] = useState(+booknumOfRead);

  const toast = useToast();

  const handleUpdateBook = async () => {
    const updateBookInfo = {
      title: title,
      author: author,
      isbn: isbn,
      description: description,
      numOfRead: +numOfRead,
    };

    try {
      // Call the postBook function to add a new book
      await updateBook(userId, bookId, updateBookInfo);
      // Display success message
      toast({
        title: "Book added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Display error message
      toast({
        title: "Error adding book",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box m={4}>
      <Heading as="h2" size="lg" mb={4}>
        Edit Data
      </Heading>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Author</FormLabel>
        <Input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          mb={4}
        />
      </FormControl>

      <FormControl>
        <FormLabel>ISBN</FormLabel>
        <Input
          type="text"
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}
          mb={4}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb={4}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Number of Reads</FormLabel>
        <Input
          type="number"
          value={numOfRead}
          onChange={(e) => setNumOfRead(e.target.value)}
          mb={4}
        />
      </FormControl>

      <Button colorScheme="teal" onClick={() => handleUpdateBook()}>
        Save
      </Button>
    </Box>
  );
};

export default UpdateBookForm;
