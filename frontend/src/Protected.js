import { Navigate} from "react-router-dom";
const Protected = ({ isLoggedIn,isnotLoggedIn, children}) => {
  if (!isLoggedIn && isnotLoggedIn) {
        return <Navigate to="/"/>
  }
return children;


  
};
export default Protected;