import {Radio , Card, Col, Row, Table} from "antd";
import React, {useState} from "react";
import './salesChart.less'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EllipsisOutlined
} from '@ant-design/icons'
import {
  Axis,
  Chart,
  Coord,
  Geom,
  Guide,
  Label,
  Legend, Tooltip as BTooltip,
  Tooltip
} from "bizcharts";
import DataSet from "@antv/data-set";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
const SalesChart = () => {


  const data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];

  const columns = [
    {
      title: '排名',
      dataIndex: 'name',
      width:80,
    },
    {
      title: '搜索关键词',
      dataIndex: 'chinese',
    },
    {
      title: '用户数',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: '周涨幅',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];
  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }

  const { DataView } = DataSet;
  const data1 = [
    {
      item: "事例一",
      count: 40,
      sun:50,
    },
    {
      item: "事例二",
      count: 21,
      sun:50,
    },
    {
      item: "事例三",
      count: 17,
      sun:50,
    },
    {
      item: "事例四",
      count: 13,
      sun:50,
    },
    {
      item: "事例五",
      count: 9,
      sun:50,
    }
  ];
  const dv = new DataView();
  dv.source(data1).transform({
    type: "percent",
    field: "count",
    dimension: "item",
    as: "percent"
  });
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + "%";
        return val;
      }
    }
  };
  let data2 = [
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
  let dv2 = new DataSet.View().source(data2);
  dv2.transform({
    type: "fold",
    fields: ["ACME", "Compitor"],
    key: "type",
    value: "value"
  });
  const scale = {
    value: {
      alias: "The Share Price in Dollars",
      formatter: function(val) {
        return "$" + val;
      }
    },
    year: {
      range: [0, 1]
    }
  };
  const proportionRa=(<Radio.Group onChange={onChange} defaultValue="a">
    <Radio.Button value="a">全部渠道</Radio.Button>
    <Radio.Button value="b">Shanghai</Radio.Button>
  </Radio.Group>)

  return (
      <div className="sales-chart">
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card title="线上热门搜索" className="sales-chart-search" extra={<EllipsisOutlined />}>
              <Row gutter={[68,0]}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className="sales-chart-search-user">
                    <div>
                        <div className="sales-chart-search-user-title">
                          <span>
                            搜索用户数
                          </span>
                          <InfoCircleOutlined />
                        </div>
                        <div className="sales-chart-search-user-count">
                          <span>
                            1234
                          </span>
                          <span>
                             12
                          </span>
                          {React.createElement(
                              true ? CaretUpOutlined : CaretDownOutlined)}
                        </div>
                    </div>
                    <Chart
                        data={dv2}
                        padding={"auto"}
                        scale={scale}
                        height={70}  forceFit={true}
                    >

                      <Tooltip showTitle={false}
                               itemTpl='<li data-index={index}>
                  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                  <span style="padding-right: 1rem;">{title}</span>{value}</li>'
                               crosshairs={{
                                 type: 'rect' || 'x' || 'y' || 'cross'
                               }} />

                      <Geom type="area" position="year*value" color="type" shape="smooth"/>
                      <Geom
                          type="line"
                          position="year*value"
                          color="type"
                          shape="smooth"
                          size={2}
                      />
                    </Chart>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className="sales-chart-search-user">
                  <div>
                    <div className="sales-chart-search-user-title">
                          <span>
                            人均搜索次数
                          </span>
                      <InfoCircleOutlined />
                    </div>
                    <div className="sales-chart-search-user-count">
                          <span>
                            2.7
                          </span>
                      <span>
                             26.2
                          </span>
                      {React.createElement(
                          true ? CaretUpOutlined : CaretDownOutlined)}
                    </div>
                  </div>
                  <Chart
                      data={dv2}
                      padding={"auto"}
                      scale={scale}
                      height={70}  forceFit={true}
                  >

                    <Tooltip showTitle={false}
                             itemTpl='<li data-index={index}>
                  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                  <span style="padding-right: 1rem;">{title}</span>{value}</li>'
                             crosshairs={{
                               type: 'rect' || 'x' || 'y' || 'cross'
                             }} />

                    <Geom type="area" position="year*value" color="type" shape="smooth"/>
                    <Geom
                        type="line"
                        position="year*value"
                        color="type"
                        shape="smooth"
                        size={2}
                    />
                  </Chart>
                </Col>
              </Row>
              <div>
                <Table columns={columns} dataSource={data}  size="middle" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card title='销售额类别占比' className="sales-chart-proportion" extra={proportionRa}>
              <div>
                <Chart
                    data={dv}
                    scale={cols}
                    height={500} forceFit={true}
                    padding={"auto"}
                >
                  <Coord  type={"theta"} radius={0.75} innerRadius={0.68} />
                  <Axis name="percent" />
                  <Legend
                      itemTpl={'<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="cursor: pointer;font-size: 14px;">'
                      + '<i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>'
                      + '<span class="g2-legend-text">{value}</span>'
                      + '</li>'}
                      position="right"
                  />
                  <Tooltip
                      showTitle={false}
                      itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Guide>
                  <Guide.Text
                      top
                      position={['50%', '50%']}
                      content='总销量200'
                      style={{ textAlign: 'center', fontSize: 24 }}
                  />
                </Guide>
                  <Geom
                      type="intervalStack"
                      position="percent"
                      color="item"
                      tooltip={[
                        "item*percent",
                        (item, percent) => {
                          percent = percent * 100 + "%";
                          return {
                            name: item,
                            value: percent
                          };
                        }
                      ]}
                      style={{
                        lineWidth: 1,
                        stroke: "#fff"
                      }}
                  >
                    <Label
                        content="percent"
                        formatter={(val, item) => {
                          return item.point.item + ": " + val;
                        }}
                    />
                  </Geom>
                </Chart>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
  )
}

export default SalesChart