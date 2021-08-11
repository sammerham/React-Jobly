import { useHistory } from "react-router";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import "./ProfileForm.css";

/** ProfileForm
 * 
 * Props:
 *  - editProfile()
 *  - currentUser {username, firstName, lastName, email,...}
 * 
 * State:
 *  - formData
 *  - formError
 */

function ProfileForm({ editProfile, currentUser }) {

  const { firstName, lastName, email, username } = currentUser;

  let initialState = {
    firstName, lastName, email, username, password: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(null);

  const history = useHistory();

  /** Sets form data to represent user input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  };

 
  async function handleSubmit(evt) {

    evt.preventDefault();

    try {
      await editProfile(formData);
      setFormData(initialState);
      history.push("/");
    } catch (err) {
      setFormError(err);
    };

  }

  return (
    <div className="ProfileForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3>Edit Profile</h3>
      <Card>
        <Card.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="ProfileFormUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
                placeholder={currentUser.username}
                name="username"
                value={formData.username}
                onChange={handleChange}
                readOnly />
            </Form.Group>

            <Form.Group controlId="ProfileFormFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text"
                placeholder={currentUser.firstName}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="ProfileFormLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text"
                placeholder={currentUser.lastName}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="ProfileFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                placeholder={currentUser.email}
                name="email"
                value={formData.email}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="ProfileFormPassword">
              <Form.Label>Confirm Password to Edit Profile</Form.Label>
              <Form.Control type="password"
                placeholder=""
                name="password"
                value={formData.password}
                onChange={handleChange} />
            </Form.Group>

            <Button className="ProfileForm-button"
              variant="primary"
              type="submit">
              Edit Profile
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProfileForm;