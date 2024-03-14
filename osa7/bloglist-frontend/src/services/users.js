import axios from 'axios'
const baseUrl = '/api/users/'

const getUser = async (id) => {
  const result = await axios.get(baseUrl.concat(id))

  return result.data
}

const getAll = async () => {
  const result = await axios.get(baseUrl)

  return result.data
}

const exports = { getUser, getAll }
export default exports
