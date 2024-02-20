import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { getSingleBook } from "../API/apiService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailBook = () => {
  const [book, setBook] = useState({});
  const { userId, bookId } = useParams();

  useEffect(() => {
    handleBookDetail();
  }, []);

  const handleBookDetail = () => {
    getSingleBook(userId, bookId)
      .then((res) => {
        if (res.length === 0) {
          console.log(error);
        } else {
         console.log(res)
          setBook(res);
        }
      })
      .catch(() => {
        console.log(error);
      });
  };

  return (
    <div>
      
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">Title: {book.title}</Heading>
              <Heading size="sm">Author: {book.Author}</Heading>
              <Text>ISBN: {book.isbn}</Text>
              <Text py="2">
                {book.description}
              </Text>
              <Text>Number of read: {book.numofread}</Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Buy Latte
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      
    </div>
  );
};

export default DetailBook;
