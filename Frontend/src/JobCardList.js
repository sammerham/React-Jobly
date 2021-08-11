import JobCard from "./JobCard";
import "./JobCardList.css";

/** JobCardList
 * 
 * Props:
 *  - jobs [{job, {job},...]
 * 
 * State:
 *  - none
 * 
 *  JobList -> JobCardList -> JobCard
 */

function JobCardList({ jobs }) {

  let jobCards = jobs.map(job =>
    <JobCard showCompanyName={true} key={job.id} job={job} />);
  return (
    <div className="JobCardList">{jobCards}</div>
  );
}

export default JobCardList;