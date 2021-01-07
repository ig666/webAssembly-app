import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EntireRoute from '../router/entireRoute'
import Content from '../layout/content'

const AppRouter: FC = () => {
    return (
        <Router>
            <Switch>
                {
                    EntireRoute.map((item, index) => {
                        return <Route exact key={index} path={item.path} component={item.component}></Route>
                    })
                }
                <Route path='/' component={Content} ></Route>
            </Switch>
        </Router>
    )
}

export default AppRouter