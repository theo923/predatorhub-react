import { useContext } from "react";
import { ModalContext } from "../../Hooks/ModalContextHook";
import Icon from "../Icon";

const TopBar: React.FC = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <div className="flex justify-between p-6">
      <Icon />
      <button onClick={openModal}>Add Bookmark</button>
    </div>
  );
};

export default TopBar;
