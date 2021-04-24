import axios from "axios"
const baseUrl = "/api/users/"

const getAUsers = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data).catch((error) => error)
}

export default { getAUsers }
