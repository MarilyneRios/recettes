import { useNavigate } from 'react-router-dom';
import { IoReturnUpBack } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleGoBack}
    className="btn btn-dark  mt-2 fs-4 border border-dark rounded "
    style={{ position: "absolute", top: 0, left: 10 }}>
        <IoReturnUpBack size={25}/>
    </button>
  );
};

export default BackButton;
