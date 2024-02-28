import axios from "axios";
export class ApiService {
  private axiosClient;
  constructor(baseAPIURL: string) {
    this.axiosClient = axios.create({
      baseURL: baseAPIURL,
    });
  }
  public async getData(endpointUrl) {
    try {
      const { response } = await this.axiosClient.get(endpointUrl);
      return response;
    } catch (e) {
      throw e;
    }
  }
  public async postData(endpointURL, payload) {
    try {
      const { response } = await this.axiosClient.post(endpointURL, payload);
      return response;
    } catch (e) {
      throw e;
    }
  }
}
