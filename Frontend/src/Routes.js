import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

/** Routes
 * 
 * Props: 
 *  - login ()
 *  - signup ()
 *  - currentUser {username, firstName, lastName, email,...}
 * 
 * State
 *  - none
 * 
 * App -> Routes -> {
 *    Homepage, 
 *    LoginForm,
 *    SignupForm,
 *  }
 */

function Routes({ login, signup, currentUser }) {

  console.log("Routes currentUser", currentUser);

  return (
    <Switch>

      <Route exact path="/">
        <Homepage currentUser={currentUser} />
      </Route>

      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

      <Route exact path="/signup">
        <SignupForm signup={signup} />
      </Route>

      <Redirect to="/login" />

    </Switch>
  );
}

export default Routes;