import React from "react";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./pages/bookList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books/:user" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
