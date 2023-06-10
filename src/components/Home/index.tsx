import { useContext } from "react";
import { AddBookmarkModal, BookmarkContext } from "../../Hooks/Bookmark";
import { ModalContext } from "../../Hooks/ModalContextHook";
import TopBar from "../TopBar";

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
              className="flex items-center"
              key={index}
              onClick={() => window.open(bookmark.url, "_blank")}
            >
              {bookmark?.faviconUrl && (
                <img
                  className="inline-block w-6 h-6 mr-2"
                  src={bookmark?.faviconUrl}
                  alt="Favicon"
                />
              )}
              {bookmark.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
