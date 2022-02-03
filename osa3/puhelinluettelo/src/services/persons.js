import axios from 'axios'
const dbUrl = '/api/persons'

const dbug = true

const getAll = () => {
    if (dbug) console.log('getAll()...')
    const request = axios.get(dbUrl)
    if (dbug) console.log('...löysi jotain'
                , request.then(response => response.data))
    return request.then(response => response.data)
}

const create = newObject => {
    if (dbug) console.log(`create(${newObject.name})...`)
    const request = axios.post(dbUrl, newObject)
    if(dbug) console.log('...lisäsi jotain'
                    , request.then(response => response.data))
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    if (dbug) console.log(`update(${id})...`)
    const request = axios.put(`${dbUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteName = (id) => {
    if (dbug) console.log(`deleteName(${id})...`)
    const request = axios.delete(`${dbUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    deleteName
}