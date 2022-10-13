import { createSlice } from '@reduxjs/toolkit'
import { fetchReact } from './React.action'
import { addReact } from './React.action'
import { editReact } from './React.action'
import { deleteReact } from './React.action'

const fetchReactExtraReducer = {
    [fetchReact.pending]: (state, action) => {
        state.loading = true
    },
    [fetchReact.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchReact.rejected]: (state, action) => {
        state.loading = false
    },
}

const addReactExtraReducer = {
    [addReact.pending]: (state, action) => {
        state.loading = true
    },
    [addReact.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addReact.rejected]: (state, action) => {
        state.loading = false
    },
}

const editReactExtraReducer = {
    [editReact.pending]: (state, action) => {
        state.loading = true
    },
    [editReact.fulfilled]: (state, action) => {
        const { id, react } = action.payload
        const existingReact = state.entities.find(
            (React) => React.id.toString() === id.toString()
        )
        if (existingReact) {
            existingReact.react = react
        }
        state.loading = false
    },
    [editReact.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteReactExtraReducer = {
    [deleteReact.pending]: (state, action) => {
        state.loading = true
    },
    [deleteReact.fulfilled]: (state, action) => {
        const id = action.payload
        const existingReact = state.entities.find(
            (React) => React.id.toString() === id.toString()
        )
        if (existingReact) {
            state.entities = state.entities.filter((React) => React.id !== id)
        }
        state.loading = false
    },
    [deleteReact.rejected]: (state, action) => {
        state.loading = false
    },
}
const ReactSlice = createSlice({
    name: 'React',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        ReactAdded(state, action) {
            state.entities.push(action.payload)
        },
        ReactUpdated(state, action) {
            const { id, react } = action.payload
            const existingReact = state.entities.find(
                (React) => React.id.toString() === id.toString()
            )
            if (existingReact) {
                existingReact.react = react
            }
        },
        ReactDeleted(state, action) {
            const { id } = action.payload
            const existingReact = state.entities.find(
                (React) => React.id.toString() === id.toString()
            )
            if (existingReact) {
                state.entities = state.entities.filter(
                    (React) => React.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchReactExtraReducer,
        ...addReactExtraReducer,
        ...editReactExtraReducer,
        ...deleteReactExtraReducer,
    },
})

export const { ReactAdded, ReactUpdated, ReactDeleted } = ReactSlice.actions

export default ReactSlice.reducer
