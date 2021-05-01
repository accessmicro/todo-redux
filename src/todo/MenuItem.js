import { Link } from "react-router-dom";

const MenuItem = ({ path, handleClick, children, isUpdate }) => {
  const styleActive = {
    display: "inline-block",
    color: 'white',
    backgroundColor: '#cc9a9a',
    borderRadius: "4px",
    paddingLeft: "5px",
    paddingRight: "5px",
  };
  const styleDefault = {
    display: "inline-block",
    paddingLeft: "5px",
    paddingRight: "5px",
  };
  return (
    <Link
      to={path}
      onClick={handleClick}
      style={isUpdate ? styleActive : styleDefault}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
