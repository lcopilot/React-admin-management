import React, {useEffect, useState} from "react";
import './home.less'
import Statistics from "../../components/home/statistics";
import {Button, Card, Col, DatePicker, Row, Tabs} from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import DetailedChart from "../../components/home/detailedChart";

moment.locale('zh-cn');

const {TabPane} = Tabs
const {RangePicker} = DatePicker;

const Home = () => {
  const [tSelection, setTSelection] = useState(true);

  const collapsedTimeSelection = () => {
    const width = document.body.clientWidth
        || document.documentElement.clientWidth
    if (width <= 900) {
      return setTSelection(false);
    }
    setTSelection(true)
  }

  useEffect(() => {
    collapsedTimeSelection();
    window.addEventListener('resize', collapsedTimeSelection)
    return () => {
      window.removeEventListener('resize', collapsedTimeSelection)
    }
  }, []);

  const timeSelection = (
      <>
        <Row>
          <Col xs={0} sm={0} md={0} lg={3} xl={3}>
            <Button type="dashed">
            今天
          </Button>
          </Col>
          <Col xs={0} sm={0} md={0} lg={3} xl={3}>
            <Button type="dashed">
              本周
            </Button>
          </Col>
          <Col xs={0} sm={0} md={0} lg={3} xl={3}>
            <Button type="dashed">
              本月
            </Button>
          </Col>
          <Col xs={0} sm={0} md={0} lg={3} xl={3}>
            <Button type="dashed">
              本年
            </Button>
          </Col>
          <Col xs={0} sm={24} md={24} lg={12} xl={12}>
            <RangePicker/>
          </Col>
        </Row>
      </>
  );

  return (
      <>
        <Statistics/>
        <div className="detailed-chart">
          <Card>
            <Tabs defaultActiveKey="1"
                  tabBarExtraContent={timeSelection}>
              <TabPane tab="销售额" key="1">
                <DetailedChart/>
              </TabPane>
              <TabPane tab="访问量" key="2">
                <DetailedChart/>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <div>

        </div>
        <div>

        </div>
      </>
  )
}

export default Home