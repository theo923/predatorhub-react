import { useContext } from "react";
import {
  AddBookmarkModal,
  BookmarkContext,
} from "../../Hooks/Bookmark/Bookmark";
import { ModalContext } from "../../Hooks/ModalContextHook/ModalContextHook";
import TopBar from "../TopBar/TopBar";

const HomePage: React.FC = () => {
  const { modalIsOpen, closeModal } = useContext(ModalContext);
  const { bookmarks } = useContext(BookmarkContext)!;

  return (
    <div>
      <TopBar />
      <div className="flex justify-center items-center">
        <AddBookmarkModal isOpen={modalIsOpen} closeModal={closeModal} />
        <div>
          {bookmarks.map((bookmark, index) => (
            <button
            key={index}
            onClick={() => window.open(bookmark.url, "_blank")}
            >
              {bookmark.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
