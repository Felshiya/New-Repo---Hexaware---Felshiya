import store from 'store/store'
import { reactAdded, reactDeleted, reactUpdated } from '../reactSlice'

describe('testing react redux store reducers', () => {
    test('add react to store test', () => {
        let state = store.getState().react
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            React: 'React',
        }
        store.dispatch(reactAdded(initialInput))
        state = store.getState().react
        expect(state.entities).toHaveLength(1)
    })

    test('update react from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            React: 'React',
        }
        store.dispatch(reactAdded(initialInput))
        let state = store.getState().react
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            React: 'React1',
        }
        store.dispatch(reactUpdated(updatedInput))
        state = store.getState().react
        let changedReact = state.entities.find((p) => p.id === 2)
        expect(changedReact).toStrictEqual(updatedInput)
    })

    test('delete react from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            React: 'React',
        }
        store.dispatch(reactAdded(initialInput))
        let state = store.getState().react
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            reactDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().react
        expect(state.entities).toHaveLength(2)
    })
})
