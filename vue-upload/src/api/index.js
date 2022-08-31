import axios from '../lib/request'

export const upload = (data) => {
    return axios.post('/upload',data,{
        Headers: {
            'Content-type': 'multipart/form-data'
        }
    })
}

export const multipleUpload = (data) => {
    return axios.post('/upload-multiple-files', data,
        {
            Headers: {
                'Content-type': 'multipart/form-data'
            }
        }
    )
}

export const deleteImg = (data) => {
  return axios.post('/deletePic', data)
}
export const login = (data) => {
    return axios.post('/login', data)
}
