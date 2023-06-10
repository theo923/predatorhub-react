import logo from "./assets/icon.png"; // Make sure the path is correct

interface IconProps {
  iconClass?: string;
}

const Icon: React.FC<IconProps> = ({ iconClass = "w-12" }) => {
  return <img className={iconClass} src={logo} alt="Logo" />;
};

export default Icon;
