const BASE_URL = "http://localhost:3000";

// Common error handler
const handleErrors = (response, errorMessage) => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(errorMessage);
    } else {
      throw new Error(`Error: ${errorMessage}. Status code: ${response.status}`);
    }
  }
};

// fetch function
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    handleErrors(response, "Request failed");
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getUsers = async () => {
  const url = `${BASE_URL}/users`;
  try {
    const users = await fetchData(url);
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

export const getBooks = async (userId) => {
  const url = `${BASE_URL}/books/${userId}`;
  try {
    const books = await fetchData(url);
    return books;
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
};

export const getSingleBook = async (userId, bookId) => {
  const url = `${BASE_URL}/book/detail/${userId}/${bookId}`;
  try {
    const book = await fetchData(url);
    return book;
  } catch (error) {
    console.error("Error getting single book:", error);
    throw error;
  }
};

export const postBook = async (title, author, isbn, description, numOfRead, userId) => {
  const url = `${BASE_URL}/books/${title}/${author}/${isbn}/${description}/${numOfRead}/${userId}`;
  const options = { method: "POST" };
  
  try {
    const data = await fetchData(url, options);
    return data;
  } catch (error) {
    console.error("Error posting book:", error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  const url = `${BASE_URL}/books/delete/${bookId}`;
  const options = { method: "DELETE" };
  
  try {
    const result = await fetchData(url, options);
    return result;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export const updateBook = async (userId, bookId, updatedBookInfo) => {
  const url = `${BASE_URL}/book/update/${userId}/${bookId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBookInfo),
  };
  
  try {
    const data = await fetchData(url, options);
    return data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};
