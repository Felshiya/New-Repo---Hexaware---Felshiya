import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'React'

export const fetchReact = createAsyncThunk('React/fetchReact', async () => {
    const response = await axios.get(`/${endPoint}`)
    const React = await response.data
    return React
})

export const addReact = createAsyncThunk(
    'React/addReact',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const React = await response.data
        thunkAPI.dispatch(showSuccess('React added successfully'))
        return React
    }
)

export const editReact = createAsyncThunk(
    'React/editReact',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const React = await response.data
        thunkAPI.dispatch(showSuccess('React updated successfully'))
        return React
    }
)

export const deleteReact = createAsyncThunk(
    'React/deleteReact',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected React deleted successfully.')
            )
            return data.id
        }
    }
)
