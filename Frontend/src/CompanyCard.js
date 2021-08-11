import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** CompanyCard
 * 
 * Props:
 * - company {handle, description, logoUrl, name}
 * 
 * State:
 * - none
 * 
 * CompanyList -> CompanyCard
 */

function CompanyCard({ company }) {

  const { handle, description, logoUrl, name } = company;

  return (
    <Link className="CompanyCard" to={`/companies/${handle}`}>
      <Card>
        <Card.Body>
          {logoUrl ? <img src={logoUrl} alt={name} /> : null}
          <p><b>{name}</b></p>
          <p>{description}</p>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CompanyCard;