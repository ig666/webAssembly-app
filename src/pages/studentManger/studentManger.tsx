import { FC, useState } from "react";
import {
  Card,
  message,
  Form,
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  DatePicker,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { handleService } from "../../utils/request";
import dayjs from "dayjs";
import CqTableUtils from "../../components/Cq-TableUtils";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { col } from "../../option/index";

const { Column } = Table;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const StudentManger: FC = () => {
  //状态类
  const [tableSize, setTableSize] = useState<SizeType>("middle");
  const [searchData, setSearchData] = useState({});
  const [form] = Form.useForm();
  const [modealForm] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  //请求类
  const { tableProps, refresh } = useRequest(
    ({ current, pageSize }) => {
      return handleService({
        data: { pageSize, pageIndex: current, ...searchData },
        url: "getPdfList",
        method: "GET",
      });
    },
    {
      debounceInterval: 300,
      paginated: true,
      refreshDeps: [searchData],
      formatResult: (result: any) => {
        if (!result) return;
        const { data } = result;
        data.list = data.list.map((item: PdfProps, index: number) => {
          item.key = index;
          return item;
        });
        return data;
      },
    }
  );
  const modalRequest = useRequest(handleService, {
    manual: true,
    onSuccess: (result) => {
      if (result) {
        setModalVisible(false);
        modealForm.resetFields();
        message.success("编辑成功");
        refresh();
      }
    },
  });
  //方法类
  const getFields = () => {
    let children = (
      <>
        <Col lg={col.lg} md={col.md} sm={col.sm} xs={col.xs}>
          <Form.Item name="serviceName" label="服务商名称:">
            <Input placeholder="请输入服务商名称" />
          </Form.Item>
        </Col>
        <Col lg={col.lg} md={col.md} sm={col.sm} xs={col.xs}>
          <Form.Item name="servicePerson" label="服务人员名称:">
            <Input placeholder="请输入服务人员名称" />
          </Form.Item>
        </Col>
        <Col lg={col.lg} md={col.md} sm={col.sm} xs={col.xs}>
          <Form.Item name="serviceTime" label="服务日期:">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </>
    );
    return children;
  };
  const formSearch = () => {
    return (
      <Card style={{ marginBottom: "15px" }}>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={(values) => {
            if (values.serviceTime) {
              values.serviceStartTime = dayjs(values.serviceTime[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              values.serviceEndTime = dayjs(values.serviceTime[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            }
            delete values.serviceTime;
            setSearchData(values);
          }}
        >
          <Row gutter={24}>{getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space size="middle">
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    setSearchData("");
                  }}
                >
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };
  const formatterPagination = () => {
    tableProps.pagination.responsive = true;
    tableProps.pagination.showSizeChanger = true;
    tableProps.pagination.showQuickJumper = true;
    tableProps.pagination.showTotal = (total, range) =>
      `${range[0]}-${range[1]} of ${total} items`;
    return tableProps;
  };
  /**
   * @新增模态框
   */
  const addPdf = () => {
    setModalVisible(true);
  };
  return (
    <>
      {formSearch()}

      {/* S table */}
      <Card>
        <CqTableUtils refresh={refresh} setTableSize={setTableSize}>
          <Button onClick={addPdf} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>
        </CqTableUtils>
        <Table<UserProps>
          {...formatterPagination()}
          scroll={{ scrollToFirstRowOnChange: true, x: 1500 }}
          size={tableSize}
        >
          <Column
            title="服务商名称"
            dataIndex="serviceName"
            key="serviceName"
          />
          <Column title="餐厅名称" dataIndex="restaurant" key="restaurant" />
          <Column title="服务日期" dataIndex="serviceTime" key="serviceTime" />
          <Column
            title="服务人员"
            dataIndex="servicePerson"
            key="servicePerson"
          />
          <Column
            title="服务形式"
            dataIndex="serviceMethod"
            key="serviceMethod"
          />
          <Column
            title="服务开始时间"
            dataIndex="serviceStartTime"
            key="serviceStartTime"
          />
          <Column
            title="服务结束时间"
            dataIndex="serviceEndTime"
            key="serviceEndTime"
          />
          <Column title="创建时间" dataIndex="createTime" key="createTime" />
          <Column title="修改时间" dataIndex="updateTime" key="updateTime" />
        </Table>
      </Card>
      {/* E table */}

      {/* S 新增PDF弹窗 */}
      <Modal
        title="新增"
        width={700}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          modealForm.resetFields();
        }}
        footer={[
          <Button
            key="add"
            type="primary"
            onClick={() => {
              console.log("虫害描述");
            }}
          >
            新增餐厅虫害描述
          </Button>,
          <Button
            key="back"
            onClick={() => {
              setModalVisible(false);
              modealForm.resetFields();
            }}
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={modalRequest.loading}
            onClick={() => {
              modealForm.submit();
            }}
          >
            确认
          </Button>,
        ]}
      >
        <Form
          {...layout}
          name="basic"
          form={modealForm}
          onFinish={(values) => {
            values.serviceTime = dayjs(values.serviceTime);
            const parmas = {
              ...values,
              servicePestisLists: [
                { area: "厨房", questionClassify: "飞虫" },
                { area: "客厅", questionClassify: "老鼠" },
              ],
            };
            modalRequest.run({
              data: parmas,
              url: "savePdf",
              method: "POST",
            });
          }}
        >
          <Form.Item
            label="服务商名称"
            name="serviceName"
            rules={[{ required: true, message: "请输入服务商名称!" }]}
          >
            <Input placeholder="请输入服务商名称" />
          </Form.Item>
          <Form.Item
            label="服务人员"
            name="servicePerson"
            rules={[{ required: true, message: "请输入服务人员!" }]}
          >
            <Input placeholder="请输入服务人员" />
          </Form.Item>
          <Form.Item
            label="餐厅名称/国际编码"
            name="restaurant"
            rules={[{ required: true, message: "请输入餐厅名称/国际编码!" }]}
          >
            <Input placeholder="请输入餐厅名称/国际编码" />
          </Form.Item>
          <Form.Item label="服务日期" name="serviceTime">
            <DatePicker placeholder="请选择服务日期" />
          </Form.Item>
          <Form.Item label="餐厅内部压力" name="restaurantStress">
            <Input placeholder="请输入餐厅内部压力" />
          </Form.Item>
          <Form.Item label="服务形式" name="serviceMethod">
            <Input placeholder="请输入服务形式" />
          </Form.Item>
        </Form>
      </Modal>
      {/* E 新增PDF弹窗 */}
    </>
  );
};

export default StudentManger;
