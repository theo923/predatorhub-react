import React from "react";
import { BookmarkProvider } from "./Hooks/Bookmark";
import HomePage from "./components/Home";

const App: React.FC = () => (
  <BookmarkProvider>
    <HomePage />
  </BookmarkProvider>
);

export default App;
