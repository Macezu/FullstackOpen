import axios from "axios"
const baseUrl = "/api/login"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials).catch((error) => {
    return Promise.reject(error.response)
  })
  return response.data
}


export default { login }
