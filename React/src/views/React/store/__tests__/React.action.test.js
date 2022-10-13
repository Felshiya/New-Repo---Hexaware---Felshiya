import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchReact, addReact, editReact, deleteReact } from '../react.action'

const getReactListResponse = [
    {
        id: 1,
        React: 'React',
    },
]

const addReactListResponse = (data) => {
    return { id: 2, ...data }
}
const editReactListResponse = (data) => {
    return data
}

describe('should test React redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'react'
    test('Should be able to fetch the react list and update react redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getReactListResponse)
        const result = await store.dispatch(fetchReact())
        const reactList = result.payload
        expect(result.type).toBe('react/fetchReact/fulfilled')
        expect(reactList).toEqual(getReactListResponse)

        const state = store.getState().react
        expect(state.entities).toEqual(reactList)
    })

    test('Should be able to add new react to list and make post api and update react redux store', async () => {
        const body = {
            React: 'React',
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addReactListResponse(body))
        const result = await store.dispatch(addReact(body))
        const reactItem = result.payload
        expect(result.type).toBe('react/addReact/fulfilled')
        expect(reactItem).toEqual(addReactListResponse(body))

        const state = store.getState().react
        expect(state.entities).toContainEqual(addReactListResponse(body))
    })

    test('Should be able to edit react in list and make put api call and update react redux store', async () => {
        const body = {
            id: 1,
            React: 'React',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editReactListResponse(body)
        )
        const result = await store.dispatch(editReact(body))
        const reactItem = result.payload
        expect(result.type).toBe('react/editReact/fulfilled')
        expect(reactItem).toEqual(editReactListResponse(body))

        const state = store.getState().react
        let changedReact = state.entities.find((p) => p.id === body.id)
        expect(changedReact.name).toEqual(body.name)
    })

    test('Should be able to delete react in list and update react redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().react
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteReact(input))
        const deletId = result.payload
        expect(result.type).toBe('react/deleteReact/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().react
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
