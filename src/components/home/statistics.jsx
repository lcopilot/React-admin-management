import {Card, Col, Divider, Row, Statistic, Tooltip} from "antd";
import {
  ExclamationCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import React from "react";
import './statistics.less'
import DataSet from "@antv/data-set";
import {Tooltip as BTooltip, Chart, Geom, Legend, Axis} from "bizcharts";



const Statistics=()=>{
  const data = [
    {
      year: "1986",
      ACME: 162,
    },
    {
      year: "1987",
      ACME: 134,

    },
    {
      year: "1988",
      ACME: 116,

    },
    {
      year: "1989",
      ACME: 122,

    },
    {
      year: "1990",
      ACME: 178,

    },
    {
      year: "1991",
      ACME: 144,

    },
    {
      year: "1992",
      ACME: 125,

    },
    {
      year: "1993",
      ACME: 176,

    },
    {
      year: "1994",
      ACME: 156
    },
    {
      year: "1995",
      ACME: 195
    },
    {
      year: "1996",
      ACME: 215
    },
    {
      year: "1997",
      ACME: 176,

    },
    {
      year: "1998",
      ACME: 167,

    },
    {
      year: "1999",
      ACME: 142
    },
    {
      year: "2000",
      ACME: 117
    },
    {
      year: "2001",
      ACME: 113,
    },
    {
      year: "2002",
      ACME: 132
    },
    {
      year: "2003",
      ACME: 146,

    },
    {
      year: "2004",
      ACME: 169,

    },
    {
      year: "2005",
      ACME: 184,

    }
  ];
  const viewsFig = new DataSet.View().source(data);
  viewsFig.transform({
    type: "fold",
    fields: ["ACME"],
    key: "type",
    value: "value"
  });
  const scale = {
    value: {
      formatter: function(val) {
        return  val;
      }
    },
  };
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
      tickInterval: 20
    }
  };
  const data2 = [
    {
      month: "2015-01-01",
      acc: 67.0
    },
    {
      month: "2015-02-01",
      acc: 14.9
    },
    {
      month: "2015-03-01",
      acc: 17.0
    },
    {
      month: "2015-04-01",
      acc: 20.2
    },
    {
      month: "2015-05-01",
      acc: 55.6
    },
    {
      month: "2015-06-01",
      acc: 56.7
    },
    {
      month: "2015-07-01",
      acc: 30.6
    },
    {
      month: "2015-08-01",
      acc: 63.2
    },
    {
      month: "2015-09-01",
      acc: 24.6
    },
    {
      month: "2015-10-01",
      acc: 14.0
    },
    {
      month: "2015-11-01",
      acc: 9.4
    },
    {
      month: "2015-12-01",
      acc: 6.3
    }
  ];
  const userFig = new DataSet.View().source(data2);
  const cols1 = {
    acc: {
      alias: "活跃量"
    }
  };

  return (
      <Row gutter={20} >
        <Col span={6}>
          <Card className="home-yesterday">
            <div className="home-yesterday-title-span">
              <span>总销售额</span>
              <span className="hint">
                <Tooltip placement="top" title={<>总销售额</>}>
                  <ExclamationCircleOutlined/>
                </Tooltip>
              </span>
            </div>
            <Statistic  value={112893} prefix="￥"/>
            <div className="home-yesterday-graphics">
              <span>
                周同比 12% {React.createElement(true ? CaretUpOutlined : CaretDownOutlined)}
              </span>
              <span>
                日同比 12% {React.createElement(false ? CaretUpOutlined : CaretDownOutlined )}
              </span>
            </div>
            <Divider />
            <div>
              日销售额 ￥<span>12,423</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="home-yesterday">
            <div className="home-yesterday-title-span">
              <span>30天访问量</span>
              <span className="hint">
                <Tooltip placement="top" title={<>近30天平台访问量<br/>图表为近30天每日访问量</>}>
                  <ExclamationCircleOutlined/>
                </Tooltip>
              </span>
            </div>
            <Statistic  value={20190415}/>
            <div >
              <Chart
                  height={46}
                  data={viewsFig}
                  forceFit={true}
                  padding={"auto"}
                  scale={scale}
              >
                <BTooltip showTitle={false}
                    itemTpl='<li data-index={index}>
                  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                  <span style="padding-right: 1rem;">{title}</span>{value}</li>'  crosshairs={{
                  type: 'rect' || 'x' || 'y' || 'cross'}}/>
                <Geom type="area" position="year*value" color="type" shape="smooth" />
              </Chart>
            </div>
            <Divider />
            <div>
              日访问量 <span>12,423</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="home-yesterday">
            <div className="home-yesterday-title-span">
              <span>支付笔数</span>
              <span className="hint">
                <Tooltip placement="top" title={<>总支付数<br/>图表为近30天每日支付数</>}>
                  <ExclamationCircleOutlined/>
                </Tooltip>
              </span>
            </div>
            <Statistic  value={112893} />
            <div >
              <Chart height={46} forceFit={true}
                     padding={"auto"} data={payFig} scale={cols}>
                <BTooltip showTitle={false}
                          itemTpl='<li data-index={index}>
                  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                  <span style="padding-right: 1rem;">{title}</span>{value}</li>'  crosshairs={{
                  type: 'rect' || 'x' || 'y' || 'cross'}}
                />
                <Geom type="interval" position="year*sales" />
              </Chart>
            </div>
            <Divider />
            <div>
              日支付数 <span>12,423</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="home-yesterday">
            <div className="home-yesterday-title-span">
              <span>总用户量</span>
              <span className="hint">
                <Tooltip placement="topRight" title={<>总用户量<br/>图表为近30天用户活跃量</>}>
                  <ExclamationCircleOutlined/>
                </Tooltip>
              </span>
            </div>
            <Statistic  value={112893}/>
            <div >
              <Chart height={46} data={userFig} scale={cols1} forceFit={true}
                     padding={"auto"} >
                <BTooltip crosshairs={{
                  type: 'rect' || 'x' || 'y' || 'cross'}} />
                <Geom
                    type="line"
                    position="month*acc"
                    size={1}
                     // 线性渐变，渐变角度为 270，渐变的起始点颜色 rgba(215, 236, 173, 1)，中点的渐变色为 rgba(150, 211, 147, 1)，结束的渐变色为 rgba(94, 144, 103, 1)
                    color="l (270) 0:rgba(215, 236, 173, 1) .3:rgba(150, 211, 147, 1) .5:rgba(110, 189, 123, 1) .7:rgba(105, 186, 120,1) 1:rgba(94, 144, 103, 1)"
                    shape="smooth"
                    style={{
                      shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                      shadowBlur: 60,
                      shadowOffsetY: 6
                    }}
                />
              </Chart>
            </div>
            <Divider/>
            <div>
              日活跃量 <span>12,423</span>
            </div>
          </Card>
        </Col>

      </Row>

  )
}

export default Statistics