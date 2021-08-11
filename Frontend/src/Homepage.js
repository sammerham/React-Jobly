import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./Homepage.css";

/** Homepage
 * 
 * Props:
 *  - currentUser {username, firstname, lastname, email,...}
 * 
 * State:
 *  - none
 * 
 */

function Homepage({ currentUser }) {

  if (currentUser) {
    return (
      <div className="Homepage">
      <Container className="Homepage-container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <Row>
          <Col><h1>Welcome back, {currentUser.firstName}!</h1></Col>
        </Row>
      </Container>
      </div>
    );
  } else {
    return (
      <div className="Homepage">
      <Container className="Homepage-container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <Row>
            <Col>
              <h1>Welcome to Jobly!</h1>
            </Col>
          </Row>
          <h5>All jobs in one, convenient place</h5>
        <Row>
          <Col>
            <Link className="Homepage-button btn btn-primary" 
                  to="/login">Log In</Link>
            <Link className="Homepage-button btn btn-primary" 
                  to="/signup">Sign Up</Link>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Homepage;