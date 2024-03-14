import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const targetUrl = baseUrl.concat(newObject.id)
  const response = await axios.put(targetUrl, newObject)
  return response.data
}

const remove = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const targetUrl = baseUrl.concat(newObject.id)
  const response = await axios.delete(targetUrl, config)
  return response.data
}

//laitetaan exportit vakioon ettei lintti ulise
const exp = { setToken, getAll, create, update, remove }

export default exp