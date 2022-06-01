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
