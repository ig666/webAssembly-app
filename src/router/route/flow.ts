import FlowOrder  from '../../pages/flow/flowOrder'

const Flows:shouldRenderProps[]= [
    {
        path:'/flow',
        icon:'icon-twitter',
        title:"流量",
        children: [
            {
                fPath: '/flow',
                path: '/flow/oder',
                title: "流量账单",
                auth: true,
                component: FlowOrder
            }
        ]
    },
]

export default Flows