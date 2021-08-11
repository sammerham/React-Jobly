import { useEffect } from "react";
import { useHistory } from "react-router-dom";


/** Logout
* 
* Props:
*  - logout()
* 
* State: 
*  -none
*/

function Logout({ logout }) {

  const history = useHistory();

  useEffect(function logoutOnMount() {
    logout();
    history.push("/login");
  });

  return (
    <div className="Logout">
      <p>Logging out...</p>
    </div>);

}

export default Logout;