const BASE_URL = "http://localhost:3000";

const handleErrors = (response, errorMessage) => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(errorMessage);
    } else {
      throw new Error(`Error: ${errorMessage}. Status code: ${response.status}`);
    }
  }
};

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  return response.json();
};

export const getUsers = async () => {
  const users = await fetchData(`${BASE_URL}/users`);
  return users;
};

export const getBooks = async (userId) => {
  const url = `${BASE_URL}/books/${userId}`;
  const response = await fetch(url);
  handleErrors(response, "User not found");
  return response.json();
};

export const getSingleBook = async (userId, bookId) => {
  const url = `${BASE_URL}/book/detail/${userId}/${bookId}`;
  const response = await fetch(url);
  handleErrors(response, "User not found");
  return response.json();
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
