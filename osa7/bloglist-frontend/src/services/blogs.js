import axios from "axios"
import storage from "../utils/localstrg"
const baseUrl = "/api/blogs/"

const setToken = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error))
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, setToken())
  return response.data
}

const getComments = () => {
  const request = axios.get(`${baseUrl}/comments`)
  return request.then((response) => {
    console.log(`Response : ${response}`)
    response.data
  })
}

const comment = async (newObject) => {
  const response = await axios.post(
    `${baseUrl}${newObject.id}/comments`,
    newObject
  )
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, setToken())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setToken())
  return response.data
}

export default {
  getAll,
  getComments,
  create,
  update,
  setToken,
  remove,
  comment
}
