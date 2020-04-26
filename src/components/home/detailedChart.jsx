import {Badge, Col, List, Row} from "antd";
import React from "react";
import {Axis, Chart, Geom, Tooltip as BTooltip} from "bizcharts";
import DataSet from "@antv/data-set";
import './detailedChart.less'

const DetailedChart=()=>{
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
      <Row  justify="center">
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <div className="detailed-chart-columnar">
            <h4>销售趋势</h4>
            <Chart height={254} forceFit={true}
                   padding={"auto"} data={payFig} scale={cols}>
              <Axis name="year"/>
              <BTooltip/>
              <Geom type="interval" position="year*sales" />
            </Chart>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className="detailed-list">
            <List
                header={<div>销量排行</div>}
                dataSource={data}
                renderItem={(item,index)=> (
                    <List.Item>
                      <Badge count={index+1} style={index<3?{backgroundColor: '#314659'}:{backgroundColor: 'transparent',color:'#314659'}}/>
                      {item}
                    </List.Item>
                )}
            />
          </div>
        </Col>
      </Row>
  )
}


export default DetailedChart