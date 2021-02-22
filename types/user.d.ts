
interface UserProps {
    id: string;
    key: number;
    gender: number;
    username: string;
    nickname: string;
    createTime: string;
    updateTime: string;
}

interface PdfProps {
    id: string;
    key: number;
    createTime: string;
    updateTime: string;
    serviceTime: string;
    serviceName: string;
    //餐厅名称/国际编码
    restaurant: string;

    //餐厅内部压力
    restaurantStress: string;

    //服务人员
    servicePerson: string;

    //服务形式
    serviceMethod: string;

    //服务开始时间
    serviceStartTime: string;

    //服务结束时间
    serviceEndTime: string;

    //餐厅虫害风险结构list
    servicePestisLists: any[];
}