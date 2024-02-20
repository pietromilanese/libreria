import React, { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../API/apiService";
import { Logo } from "../assets/logo";
import Navigation from "../components/navigation";
import {
  Box,
  Alert,
  AlertIcon,
  Flex,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Highlight,
  Text,
  Image,
  Stack,
  Divider,
  Wrap,
} from "@chakra-ui/react";
import AddBookForm from "../components/form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [noBookFound, setNoBookFound] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null); // Track the book to delete
  const { userName, userId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    handleAddBook();
  }, [userId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddBook = () => {
    getBooks(userId)
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
    setNoBookFound(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookToDelete(null); // Reset the book to delete when closing the modal
    handleAddBook();
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

  const handleBookDetail = (userId, bookId) => {
    navigate((`/book/detail/${userId}/${bookId}`))
  }

  return (
    <Box p={4}>
 <Navigation/>

      {noBookFound && (
        <Alert status="warning" rounded="md" mb={4}>
          <AlertIcon />
          No book found in the database. Add a new book!
        </Alert>
      )}
      {/* Open the modal button */}
      <Box p={4}>
      <Heading size='2xl' mb={3}>Welcome {userName} 
      </Heading>
      
      <Heading as='h2' size='lg' lineHeight='tall'>
         <Highlight
    query='happy reading!'
    styles={{ px: '2', py: '2', rounded: 'full', bg: 'green.100' }}
  >
    This is Your personal Library, happy reading!
  </Highlight>

</Heading>
      <Button mt={4} colorScheme="teal" onClick={handleOpenModal} mb={4}>
        Add New Book
      </Button>
      </Box>

      <Box p={4}>
        <Flex flexWrap={"wrap"} justifyContent={{base: "center" , md: "flex-start"}}>
          {books.map((book) => (
            <Card  key={book.id} maxW="md" mr={4} mt={3} >
              <CardBody _hover={{ opacity: 0.8, cursor: "pointer" }}>
                <Image
                  onClick={() => handleBookDetail(userId, book.id)}
                  src={`https://api.placid.app/u/qsraj?title[text]=${book.author}%20%21`}
                  alt=""
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{book.title}</Heading>
                  <Heading size="sm">{book.author}</Heading>
                  <Text>{book.description}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteButtonClick(book.id)}
                    
                    
                  >
                     Delete
                  </Button>
                  
                  
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Flex>

        {/* Modal to add or delete book */}
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
                <AddBookForm userId={userId}  />
              )}
            </ModalBody>
            <ModalFooter>
              {bookToDelete ? (
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteBook(bookToDelete)}
                >
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
