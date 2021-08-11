import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Retrieve list of companies - if search term provided,
   * retrieve filtered list of companies. */

  static async getCompanies(term) {
    let response;
    if (term === "") {
      response = await this.request("companies");
    } else {
      response = await this.request("companies", { name: term });
    }
    return response;
  }

  /** Retrieve list of jobs - if search term provided,
   * retrieve filtered list of jobs. */
  
  static async getJobs(term) {
    let response;
    if (term === "") {
      response = await this.request("jobs");
    } else {
      response = await this.request("jobs", { title: term });
    }
    return response;
  }

  /** Authenticate - post request, return token*/

  static async authenticate({ username, password }) {
    let response = await this.request("auth/token", { username, password }, "post");
    return response.token;
  }

  /** Register - post request, return token */

  static async register({ username, password, firstName, lastName, email }) {
    let response = await this.request("auth/register",
      { username, password, firstName, lastName, email },
      "post");
    return response.token;
  }

  /** getUser - get request, returns user object */

  static async getUser(username) {
    let response = await this.request(`users/${username}`);
    return response.user;
  }
  
  /** editUser - patch request, returns user object */

  static async editUser(user) {
    const { firstName, lastName, password, email, username } = user;
    let response = await this.request(`users/${username}`,
      { password, firstName, lastName, email },
      "patch");
    return response.user;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

// module.exports= { JoblyApi };

export default JoblyApi;