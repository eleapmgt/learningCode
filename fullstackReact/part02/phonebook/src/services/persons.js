import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseURL)
}

const create = newObject => {
  return axios.post(baseURL, newObject)
}

const remove = (id) => {
  console.log('je supprime cet id:', id);
  return axios.delete(`${baseURL}/${id}`)
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseURL}/${id}`, updatedPerson)
}

const personService = {
  getAll,
  create,
  remove,
  update
}

export default personService;
