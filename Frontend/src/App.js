import { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Routes from "./Routes";
import PrivateRoutes from "./PrivateRoutes"
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

/** App
 * 
 * Props:
 *  - none
 * 
 * State:
 *  - currentUser {username, firstName, lastName, email,...}
 *  - hasLocalToken (boolean)
 *  - isLoadingUser (boolean)
 * 
 * App -> { Navigation, Routes, PrivateRoutes }
 */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasLocalToken, setHasLocalToken] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  console.log("App-Start hasLocalToken + currentUser + isLoadingUser ", hasLocalToken, currentUser, isLoadingUser);

  /** set current user and update isLoadingUser if there is a local token */
  useEffect(function changeUserFromToken() {
    let localToken = localStorage.getItem("item");
    console.log("App changeUserFromToken localToken", localToken);

    if (localToken) {
      setHasLocalToken(true);
      JoblyApi.token = localToken;
    }

    async function userAPICall() {
      try {

        console.log("App userAPICall JoblyApi.token", JoblyApi.token);

        let { username } = jwt_decode(JoblyApi.token);
        setIsLoadingUser(true);
        let response = await JoblyApi.getUser(username);
        setCurrentUser(response);
        //re-render here
        setIsLoadingUser(false);

      } catch (err) {

        console.log("App userAPICall err", err);

        setCurrentUser(null)
        setIsLoadingUser(false);
      }
    };

    if (hasLocalToken) {
      userAPICall();
    }

  }, [hasLocalToken]);

  /** Gets auth token from backend on login, sets it on
   * localStorage and updates hasLocalToken */

  async function login(formData) {

    let tokenRes = await JoblyApi.authenticate(formData);
    setHasLocalToken(true);
    localStorage.setItem("item", tokenRes);

  }

  /** Gets auth token from backend on login, sets it on 
   * localStorage & updates hasLocalToken */

  async function signup(formData) {

    let tokenRes = await JoblyApi.register(formData);
    localStorage.setItem("item", tokenRes);
    setHasLocalToken(true);

  }

  /** calls API func to update/edit user profile data, 
   * sets current user to updated user object */

  async function editProfile(formData) {

    const { username, password, firstName, lastName, email } = formData;
    await JoblyApi.authenticate({ username, password });

    let userRes = await JoblyApi.editUser({
      username,
      firstName,
      lastName,
      email
    });

    setCurrentUser(userRes);

  }

  /** Clears local storage and logs user out */
  async function logout() {

    localStorage.clear();
    setCurrentUser(null);
    setHasLocalToken(false);

  }

  console.log("App pre-return localStorage token + isLoadingUser",
    localStorage.getItem("item"),
    isLoadingUser);

  if (localStorage.getItem("item") && isLoadingUser) {
    return (
      <div className="App"><h1>loading...</h1></div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation currentUser={currentUser} />
        {currentUser !== null
          ? <PrivateRoutes currentUser={currentUser} logout={logout} editProfile={editProfile} />
          : <Routes login={login} signup={signup} currentUser={currentUser} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
