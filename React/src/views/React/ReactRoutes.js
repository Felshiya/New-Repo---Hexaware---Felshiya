import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const ReactList = Loadable(lazy(() => import('./ReactList')))
const EditReact = Loadable(lazy(() => import('./EditReact')))
const AddReact = Loadable(lazy(() => import('./AddReact')))

const ReactRoutes = [
    {
        path: '/React',
        element: <ReactList />,
    },
    {
        path: '/React/edit/:id',
        element: <EditReact />,
    },
    {
        path: '/React/add',
        element: <AddReact />,
    },
]

export default ReactRoutes
