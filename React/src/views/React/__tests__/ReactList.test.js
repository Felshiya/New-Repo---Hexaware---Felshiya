const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import ReactList from '../ReactList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render React rows when api response has data', async () => {
    const endPoint = 'react'
    const getReactListResponse = [
        {
            id: 1,
            React: 'React1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getReactListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <ReactList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const reactReactCell = await screen.findByText(/React1/i)

    expect(reactReactCell).toHaveTextContent(/React1/i)
    mock.reset()
})
