const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditReact from '../EditReact'
import { ReactAdded } from '../store/ReactSlice'
beforeAll(() => {
    store.dispatch(
        ReactAdded({
            id: 1,
            React: 'React',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="React/edit/1" replace />}
                            />
                            <Route
                                path="React/edit/:id"
                                element={<EditReact />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of ReactEdit Component', () => {
    test('should render EditReact and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveReactButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const ReactElement = screen.getByLabelText(/React/i)

        expect(saveReactButtonElement).toBeInTheDocument()

        expect(ReactElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of React edit form', async () => {
        const ReactElement = screen.getByLabelText(/React/i)

        fireEvent.change(ReactElement, { target: { value: 'React' } })

        expect(ReactElement.value).toBe('React')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const ReactElement = screen.getByLabelText(/React/i)

        fireEvent.change(ReactElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveReactButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveReactButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(1)
    })
})
