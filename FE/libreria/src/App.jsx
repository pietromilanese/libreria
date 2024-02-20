import React from "react";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./pages/bookList";
import DetailBook from "./components/detail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books/:userName/:userId" element={<BookList />} />
        <Route path="/book/detail/:userId/:bookId" element={<DetailBook />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
