const BASE_URL = "http://localhost:3000";

export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    const users = await res.json();
    return users;
}

export const getBooks = async (userId) => {
    const res = await fetch(`${BASE_URL}/books/${userId}`);

    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("User not found");
        } else {
            throw new Error(`Error fetching books. Status code: ${res.status}`);
        }
    }
    const data = await res.json();
    return data;
};   

export const getSingleBook = async (userId, bookId) => {
  const res = await fetch(`${BASE_URL}/book/detail/${userId}/${bookId}`);

  if (!res.ok) {
      if (res.status === 404) {
          throw new Error("User not found");
      } else {
          throw new Error(`Error fetching books. Status code: ${res.status}`);
      }
  }
  const data = await res.json();
  return data;
};   


export const postBook = async (title, author, isbn, description, numOfRead, userId) => {
    try {
      const response = await fetch(`${BASE_URL}/books/${title}/${author}/${isbn}/${description}/${numOfRead}/${userId}`, {
        method: "POST",
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        } else {
          throw new Error(`Error posting book. Status code: ${response.status}`);
        }
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting book:", error);
      throw error;
    }
  };




export const deleteBook = async (bookId) => {
    const res = await fetch(`${BASE_URL}/books/delete/${bookId}`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Book not found");
      } else {
        throw new Error(`Error deleting book. Status code: ${res.status}`);
      }
    }
  
    const result = await res.json();
    return result;
  };

  export const updateBook = async (userId, bookId, updatedBookInfo) => {
    try {
      const response = await fetch(`${BASE_URL}/book/update/${userId}/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBookInfo),
      });

      console.log(updatedBookInfo)
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Book not found");
        } else {
          throw new Error(`Error updating book. Status code: ${response.status}`);
        }
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  };