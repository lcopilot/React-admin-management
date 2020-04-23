import {Card, Col, Divider, Row, Statistic, Tooltip} from "antd";
import {
  ExclamationCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import React from "react";
import './statistics.less'
import DataSet from "@antv/data-set";
import {Tooltip as BTooltip, Chart, Geom, Legend} from "bizcharts";



const Statistics=()=>{
  var data = [
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
  var dv = new DataSet.View().source(data);
  dv.transform({
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



  return (
      <Row gutter={20} >
        <Col span={6}>
          <Card className="home-yesterday">
            <div className="home-yesterday-title-span">
              <span>总销售额</span>
              <span className="hint">
                <Tooltip placement="top" title="昨日销售额">
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
              <span>访问量</span>
              <span className="hint">
                <Tooltip placement="top" title="访问量">
                  <ExclamationCircleOutlined/>
                </Tooltip>
              </span>
            </div>
            <Statistic  value={20190415}/>
            <div >
              <Chart
                  height={46}
                  data={dv}
                  forceFit={true}
                  padding={"auto"}
                  scale={scale}
              >

                <BTooltip showTitle={false}
                    itemTpl='<li data-index={index}>
                  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                    {title} {value}</li>'  crosshairs={{
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
                <Tooltip placement="top" title="昨日销售额">
                  <ExclamationCircleOutlined/>
                </Tooltip>
              </span>
            </div>
            <Statistic  value={112893} />
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
              <span>昨日销售额</span>
              <span className="hint">
                <Tooltip placement="top" title="昨日销售额">
                  <ExclamationCircleOutlined/>
                </Tooltip>
              </span>
            </div>
            <Statistic  value={112893}/>
            <div className="home-yesterday-graphics">
              <span>
                周同比 12% {React.createElement(true ? CaretUpOutlined : CaretDownOutlined)}
              </span>
              <span>
                日同比 12% {React.createElement(false ? CaretUpOutlined : CaretDownOutlined )}
              </span>
            </div>
            <Divider/>
            <div>
              日销售额 ￥<span>12,423</span>
            </div>
          </Card>
        </Col>

      </Row>

  )
}

export default Statistics