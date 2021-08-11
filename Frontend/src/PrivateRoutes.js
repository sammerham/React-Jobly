import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import ProfileForm from "./ProfileForm";
import Logout from "./Logout";

/** Private Routes
 * 
 * Props: 
 *  - currentUser {username, firstName, lastName, email,...}
 *  - logout()
 *  - editProfile()
 * 
 * State:
 *  - none
 * 
 * App -> PrivateRoutes -> {
 *    Homepage, 
 *    CompanyDetails, 
 *    CompanyList,
 *    JobList,
 *    Logout 
 *    ProfileForm 
 *  }
 */

function PrivateRoutes({ logout, currentUser, editProfile }) {

  console.log("PrivateRoutes currentUser", currentUser);

  return (
    <Switch>

      <Route exact path="/">
        <Homepage currentUser={currentUser} />
      </Route>

      <Route exact path="/companies/:handle">
        <CompanyDetails />
      </Route>

      <Route exact path="/companies">
        <CompanyList />
      </Route>

      <Route exact path="/jobs">
        <JobList />
      </Route>

      <Route exact path="/profile">
        <ProfileForm currentUser={currentUser} editProfile={editProfile} />
      </Route>

      <Route exact path="/logout">
        <Logout logout={logout} />
      </Route>

      <Redirect to="/" />

    </Switch>
  );
}

export default PrivateRoutes;