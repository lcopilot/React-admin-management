import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  List,
  Row,
  Skeleton,
  Tabs
} from "antd";
import React, {useState} from "react";
import {Axis, Chart, Geom, Tooltip as BTooltip} from "bizcharts";
import DataSet from "@antv/data-set";
import './detailedChart.less'
import moment from 'moment';
import 'moment/locale/zh-cn';
import DetailedChart from "../../components/home/detailedChart";

moment.locale('zh-cn');

const {TabPane} = Tabs
const {RangePicker} = DatePicker;

const Detailed = () => {

  const [startTime, setSTime] = useState(moment().startOf('year'));
  const [endTime, setETime] = useState(moment());

  const setTime = (type) => {
    if (type === 1) {
      setSTime(moment());
      setETime(moment());
    } else if (type === 2) {
      setSTime(moment().startOf('week'));
      setETime(moment());
    } else if (type === 3) {
      setSTime(moment().startOf('month'));
      setETime(moment());
    } else if (type === 4) {
      setSTime(moment().startOf('year'));
      setETime(moment());
    }
  }

  const timeChange = (time) => {
    setSTime(moment(time[0]._d));
    setETime(moment(time[1]._d));
  }

  const timeSelection = (
      <>
        <Row>
          <Col xs={0} sm={0} md={0} lg={3} xl={3}>
            <Button type="dashed" onClick={() => {
              setTime(1)
            }}>
              今天
            </Button>
          </Col>
          <Col xs={0} sm={0} md={0} lg={3} xl={3}>
            <Button type="dashed" onClick={() => {
              setTime(2)
            }}>
              本周
            </Button>
          </Col>
          <Col xs={0} sm={0} md={0} lg={3} xl={3}>
            <Button type="dashed" onClick={() => {
              setTime(3)
            }}>
              本月
            </Button>
          </Col>
          <Col xs={0} sm={0} md={0} lg={3} xl={3}>
            <Button type="dashed" onClick={() => {
              setTime(4)
            }}>
              本年
            </Button>
          </Col>
          <Col xs={0} sm={24} md={24} lg={12} xl={12}>
            <RangePicker onChange={timeChange}
                         value={[moment(startTime), moment(endTime)]}/>
          </Col>
        </Row>
      </>
  );

  const DetailedChart = () => {
    const data1 = [
      {
        year: "1951 年",
        sales: 38
      },
      {
        year: "1952 年",
        sales: 52
      },
      {
        year: "1956 年",
        sales: 61
      },
      {
        year: "1957 年",
        sales: 145
      },
      {
        year: "1968 年",
        sales: 48
      },
      {
        year: "1988 年",
        sales: 48
      },
      {
        year: "1958 年",
        sales: 48
      },
      {
        year: "1951 年",
        sales: 48
      },
      {
        year: "1999 年",
        sales: 31
      },
      {
        year: "1460 年",
        sales: 442
      },
      {
        year: "1962 年",
        sales: 38
      }
    ];
    const payFig = new DataSet.View().source(data1);
    const cols = {
      sales: {
        tickInterval: 100
      }
    };
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
      'Los Angeles battles huge wildfires.',
      'Los Angeles battles huge wildfires.',
    ];

    return (
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <div className="detailed-chart-columnar">
              <h4>销售趋势</h4>
              <Chart height={254} forceFit={true}
                     padding={"auto"} data={payFig} scale={cols}>
                <Axis name="year"/>
                <BTooltip/>
                <Geom type="interval" position="year*sales"/>
              </Chart>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <div className="detailed-list">
              <List
                  header={<div>销量排行</div>}
                  dataSource={data}
                  renderItem={(item, index) => (
                      <List.Item>
                        <Badge count={index + 1}
                               style={index < 3 ? {backgroundColor: '#314659'}
                                   : {
                                     backgroundColor: 'transparent',
                                     color: '#314659'
                                   }}/>
                        {item}
                      </List.Item>
                  )}
              />
            </div>
          </Col>
        </Row>
    )
  }

  return (
      <div className="detailed-chart">
        <Card>
          <Skeleton active loading={false} paragraph={{rows: 8}}>
            <Tabs defaultActiveKey="1"
                  tabBarExtraContent={timeSelection}>
              <TabPane tab="销售额" key="1">
                <DetailedChart/>
              </TabPane>
              <TabPane tab="访问量" key="2">
                <DetailedChart/>
              </TabPane>
            </Tabs>
          </Skeleton>
        </Card>
      </div>
  )
}

export default Detailed