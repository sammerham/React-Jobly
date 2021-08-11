import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import "./CompanyDetails.css";

/** CompanyDetails
 * 
 * Props:
 * -none
 * 
 * Params:
 *  { handle }: uses url parameter /companies/:handle
 * 
 * State:
 * - company
 * 
 * PrivateRoutes -> CompanyDetails -> JobCard
 */

function CompanyDetails() {
  const [company, setCompany] = useState(null);
  const { handle } = useParams();

  useEffect(function getSingleCompanyInfoOnMount() {

    async function getSingleCompanyInfo() {
      let response = await JoblyApi.getCompany(handle);
      setCompany(response);
    };

    getSingleCompanyInfo();
  }, [handle]);

  console.log("CompanyDetails company", company);

  if (company === null) {
    return (
      <div className="CompanyDetails"><h1>Loading...</h1></div>
    );
  }

  return (
    <div className="CompanyDetails">
      {company.logoUrl && <img src={company.logoUrl} alt={company.name} />}
      <p><b>{company.name}</b></p>
      <p>{company.description}</p>
      <h2>Jobs</h2>
      <div className="CompanyDetails-jobs">
      {company.jobs?.map(job => <JobCard showCompanyName={false} key={job.id} job={job} />)}
      </div>
    </div>
  );
}

export default CompanyDetails;