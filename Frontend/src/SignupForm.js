import { useHistory } from "react-router";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import "./SignupForm.css";

/** SignupForm
 * 
 * Props:
 *  - signup()
 * 
 * State:
 *  - formData
 *  - formError
 * 
 * Routes -> SignupForm
 */

function SignupForm({ signup }) {

  let initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(null);

  const history = useHistory();

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
      await signup(formData);
      setFormData(initialState);
      history.push("/");
    } catch (err) {
      setFormError(err)
    };

  }

  return (
    <div className="SignupForm col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h3>Sign Up</h3>
      <Card>
        <Card.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signupFormUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="signupFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="signupFormFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="signupFormLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="signupFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                placeholder="E-mail"
                name="email"
                value={formData.email}
                onChange={handleChange} />
            </Form.Group>

            <Button className="SignupForm-button"
              variant="primary"
              type="submit">
              Sign Up
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignupForm;