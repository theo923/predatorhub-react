import { useContext } from "react";
import {
  AddBookmarkModal,
  BookmarkContext,
  IBookmark,
} from "../../Hooks/Bookmark";
import { ModalContext } from "../../Hooks/ModalContextHook";
import TopBar from "../TopBar";

const HomePage: React.FC = () => {
  const { modalIsOpen, closeModal } = useContext(ModalContext);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { bookmarks } = useContext(BookmarkContext)! || [];

  return (
    <div>
      <TopBar />
      <div className="flex justify-center items-center">
        <AddBookmarkModal isOpen={modalIsOpen} closeModal={closeModal} />
        <div>
          {bookmarks?.map((bookmark: IBookmark, index: number) => (
            <button
              className="flex items-center"
              key={index}
              onClick={() => window.open(bookmark.url, "_blank")}
            >
              {bookmark?.favicon_url && (
                <img
                  className="inline-block w-6 h-6 mr-2"
                  src={bookmark?.favicon_url}
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
