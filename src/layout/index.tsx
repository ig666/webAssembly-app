import React, { FC } from 'react'
import Footers from './footer'
import Contents from './content'
import Siders from './sider'
import { BrowserRouter as Router } from 'react-router-dom'
import { Layout } from 'antd';

const { Header } = Layout;

const AppRouter: FC = () => {
    return (
        <Router>
            <Layout style={{ height: '100%' }}>
                <Siders />
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Contents />
                    <Footers />
                </Layout>
            </Layout>
        </Router>
    )
}

export default AppRouter