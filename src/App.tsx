import React from "react";
import { BookmarkProvider } from "./Hooks/Bookmark/Bookmark";
import HomePage from "./components/Home/Home";

const App: React.FC = () => (
  <BookmarkProvider>
    <HomePage />
  </BookmarkProvider>
);

export default App;
