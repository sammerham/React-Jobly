import { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import "./JobList.css";

/** JobList
 * 
 * Props:
 *  - none
 * 
 * State:
 *  - jobs [{job}, {job},...]
 *  - searchTerm: string submitted from search bar
 * 
 * Private Routes -> JobList -> JobCardList
 * 
 */

function JobList() {

  const [jobs, setJobs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(function getJobsOnMount() {

    async function getJobs() {
      let response = await JoblyApi.getJobs(searchTerm);
      setJobs(response.jobs);
    };

    getJobs();
  }, [searchTerm]);

  async function searchJobs(term) {
    setSearchTerm(term);
  }

  if (jobs === null) {
    return (
      <div className="JobList"><h2>Loading...</h2></div>
    );
  }

  return (
    <div className="JobList">
      <SearchForm searchFor={searchJobs} />
      {searchTerm !== "" && <p><i>{jobs.length} result(s) for "{searchTerm}"</i></p>}
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default JobList;