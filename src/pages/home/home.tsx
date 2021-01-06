import React, { FC } from 'react'
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { RouteChildrenProps } from 'react-router-dom'

const Home: FC<RouteChildrenProps> = (props) => {
    return (
        <Result
        icon={<SmileOutlined />}
        title="Great, we have done all the operations!"
        extra={<Button type="primary">Next</Button>}
      />
    )
}

export default Home