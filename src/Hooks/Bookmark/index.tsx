import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Replace '#root' with the querySelector identifying your app root element

export type IBookmark = {
  url: string;
  name: string;
  favicon_url?: string;
};

export const BookmarkContext = createContext<
  | {
      bookmarks: IBookmark[];
      addBookmark: (url: string, name: string) => Promise<number>;
    }
  | undefined
>(undefined);

interface BookmarkProviderProps {
  children: React.ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);

  useEffect(() => {
    getBookmarks();
  }, []);

  const getBookmarks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookmarks`);
    if (res.status === 200) setBookmarks(res.data.bookmarks);
  };

  const addBookmark = async (url: string, name: string) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookmarks`, {
      url,
      name,
    });
    getBookmarks();
    return res.status;
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { addBookmark } = useContext(BookmarkContext)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await addBookmark(url, name);
    if (status === 200) {
      setUrl("");
      setName("");
    } else alert("Error adding bookmark");
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
