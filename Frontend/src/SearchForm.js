import { useState } from "react";
import "./SearchForm.css";

/** SearchForm
 * 
 * Props:
 * - searchFor()
 * 
 * State:
 * - formData
 * 
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }){
  
  let initialState = {term:""};
  const [formData, setFormData] = useState(initialState);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  };

  function handleSubmit(evt){
    evt.preventDefault();
    let trimmedTerm = formData.term.trim();
    searchFor(trimmedTerm);
    setFormData(initialState);
  };

  return (
    <form className="SearchForm form-row" onSubmit={handleSubmit}>
      <input 
            name="term" 
            value={formData.term} 
            placeholder="Enter a search term..."
            onChange={handleChange}/>
      <button className="SearchForm-button btn-sm btn-primary mb-2">Search</button>
    </form>
  );
}

export default SearchForm;