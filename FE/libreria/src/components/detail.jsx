import React from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import { getSingleBook } from "../API/apiService";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import UpdateBookForm from "./detailForm";
import { useDisclosure } from "@chakra-ui/react";

const DetailBook = () => {
  const [book, setBook] = useState({});
  const { userId, bookId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  useEffect(() => {
    handleBookDetail();
  }, []);

  const handleBookDetail = () => {
    getSingleBook(userId, bookId)
      .then((res) => {
        if (res.length === 0) {
          console.error("Book not found");
        } else {
          setBook(res);
        }
      })
      .catch(() => {
        console.error("Book not found");
      });
  };

  return (
    <div>
      <Navigation />
      <Breadcrumb m={4}>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              navigate(-1);
            }}
          >
            Books
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Detail</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        m={4}
      >
        <Image
          maxW={{ base: "100%", sm: "50%" }}
          src={`https://api.placid.app/u/qsraj?title[text]=${book.author}%20`}
          alt=""
        />

        <Stack>
          <CardBody>
            <Heading size="md">Title: {book.title}</Heading>
            <Heading size="sm">Author: {book.author}</Heading>
            <Text>ISBN: {book.isbn}</Text>
            <Text py="2">{book.description}</Text>
            <Text>Number of read: {book.numofread}</Text>
          </CardBody>

          <CardFooter><Button onClick={onOpen}> <EditIcon/> Edit</Button></CardFooter>
        </Stack>

        

        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            handleBookDetail();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modify book</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateBookForm
                userId={userId}
                bookId={book.id}
                booktitle={book.title}
                bookauthor={book.author}
                bookisbn={book.isbn}
                bookdescription={book.description}
                booknumOfRead={book.numofread}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Card>
    </div>
  );
};

export default DetailBook;
