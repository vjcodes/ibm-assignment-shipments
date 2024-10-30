import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white w-full p-4 flex justify-between">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        IBM Store Management
      </div>
      <div>Store Associate</div>
    </div>
  );
};

export default Header;
