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
import { postBook } from "../API/apiService";

const AddBookForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState("");
  const [description, setDescription] = useState("");
  const [numOfRead, setNumOfRead] = useState("");

  const toast = useToast();

  const handleAddBook = async () => {
    try {
      // Call the postBook function to add a new book
      await postBook(
        title,
        author,
        isbn,
        description,
        +numOfRead,
        userId
      );

      // Display success message
      toast({
        title: "Book added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // reset the form fields after successful submission
      setTitle("");
      setAuthor("");
      setISBN("");
      setDescription("");
      setNumOfRead("");
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
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Add a New Book
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

      <Button colorScheme="teal" onClick={handleAddBook}>
        Add Book
      </Button>
    </Box>
  );
};

export default AddBookForm;
