import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://drive.api.azsoft.dev/api/",
});

export default apiClient;

export function getTokenIncludedConfig() {
  return {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  };
}

