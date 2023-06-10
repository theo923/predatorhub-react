import { createContext, useContext, useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Replace '#root' with the querySelector identifying your app root element

type Bookmark = {
  url: string;
  name: string;
  faviconUrl?: string;
};

export const BookmarkContext = createContext<
  | { bookmarks: Bookmark[]; addBookmark: (bookmark: Bookmark) => void }
  | undefined
>(undefined);

interface BookmarkProviderProps {
  children: React.ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const AddBookmarkModal: React.FC<{
  isOpen: boolean;
  closeModal: () => void;
}> = ({ isOpen, closeModal }) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const { addBookmark } = useContext(BookmarkContext)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addBookmark({ url, name });
    setUrl("");
    setName("");
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Bookmark Modal"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bookmark name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bookmark url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add Bookmark</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
};
