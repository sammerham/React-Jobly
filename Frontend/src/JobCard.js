import Card from "react-bootstrap/Card";
import "./JobCard.css";

/** JobCard
 * 
 * Props:
 * - job { equity, id, salary, title, companyName }
 * - showCompanyName: boolean
 * 
 * { JobCardList, CompanyDetail } -> JobCard
 * 
 */

function JobCard({ job, showCompanyName }) {

  const { equity, salary, title, companyName } = job;

  return (
    <Card className="JobCard">
      <Card.Body>
        <p><b>{title}</b></p>
        {showCompanyName ? <p>{companyName}</p> : null}
        {salary ? <p>Salary: {salary}</p> : null}
        <p>Equity: {equity}</p>
      </Card.Body>
    </Card>
  );
}

export default JobCard;