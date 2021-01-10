import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllNumbers =() => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data).catch(error => catchError(error))
}

const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data).catch(error => catchError(error))
}

const updateNumber = (id,newObject) => {

    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response => response.data).catch(error => true)
}




const catchError = error => (alert(`Problem with axios log: ${error}`))
    

export default {
    getAllNumbers,
    updateNumber,
    create
}