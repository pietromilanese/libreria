import React, { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../API/apiService";
import {
  Box,
  Alert,
  AlertIcon,
  Flex,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import AddBookForm from "../components/form";
import { useParams } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [noBookFound, setNoBookFound] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null); // Track the book to delete
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
      .catch(() => {
        setNoBookFound(true);
      });
  }, [books]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookToDelete(null); // Reset the book to delete when closing the modal
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book.id !== bookId));
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting book:", error);
      // Handle error as needed
    }
  };

  const handleDeleteButtonClick = (bookId) => {
    setBookToDelete(bookId);
    handleOpenModal(); // Open the modal for confirmation
  };

  return (
    <Box textAlign="center">
      <Flex>
        {/* Your existing code */}
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

      <Box bg="tomato" p={4} display="flex" justifyContent="center" flexDir="row">
        {books.map((book) => (
          <div key={book.id}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.description}</p>
            
            {/* Delete button for each book */}
            <Button colorScheme="red" onClick={() => handleDeleteButtonClick(book.id)} size="sm" mt={2}>
              Delete
            </Button>
          </div>
        ))}

        {/* Button to open the modal */}
        <Button colorScheme="teal" onClick={handleOpenModal} mb={4}>
          Add New Book
        </Button>

        {/* Modal for adding a new book or confirming deletion */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {bookToDelete ? "Confirm Deletion" : "Add New Book"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {bookToDelete ? (
                <p>Are you sure you want to delete this book?</p>
              ) : (
                <AddBookForm userId={user} />
              )}
            </ModalBody>
            <ModalFooter>
              {bookToDelete ? (
                <Button colorScheme="red" onClick={() => handleDeleteBook(bookToDelete)}>
                  Delete
                </Button>
              ) : null}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default BookList;
