import Axios from "axios";
import { duration } from "moment";
import configuration from "../configuration";

interface IController {
  url: string;
  data?: any;
}
export default function ({ url, data }: IController) {
  return new Promise(function (resole, reject) {
    try {
      Axios({
        baseURL: configuration.baseURL,
        url,
        data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      })
        .then((response) => {
          resole(response.data);
        })
        .catch((error) => {
          error && reject(error?.response?.data || error?.message);
        });
    } catch (error) {
      reject(error);
    }
  });
}
