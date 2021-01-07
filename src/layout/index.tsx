import React, { FC } from 'react'
import Footers from './footer'
import Contents from './content'
import Siders from './sider'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';

const { Header } = Layout;

const AppRouter: FC = () => {
    return (
        <Router>
            <Switch>
                {/* <Route path='/login' component={}> */}
                <Layout style={{ height: '100%' }}>
                    <Siders />
                    <Layout>
                        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                        <Contents />
                        <Footers />
                    </Layout>
                </Layout>
            </Switch>
        </Router>
    )
}

export default AppRouter