import {Radio , Card, Col, Row, Table} from "antd";
import React, {useState} from "react";
import './salesChart.less'
import {EllipsisOutlined} from '@ant-design/icons'
import {
  Axis,
  Chart,
  Coord,
  Geom,
  Guide,
  Label,
  Legend,
  Tooltip
} from "bizcharts";
import DataSet from "@antv/data-set";
const SalesChart = () => {

  const [count,setCount]=useState(12)
  const [index,setIndex]=useState(1)

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
  const { Html } = Guide;
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

  const onChart=(e)=>{
    if (e.data){
      setCount(e.data.point.count)
      setIndex(data1.indexOf(e.data.point.item))
    }
  }

  const proportionRa=(<Radio.Group onChange={onChange} defaultValue="a">
    <Radio.Button value="a">全部渠道</Radio.Button>
    <Radio.Button value="b">Shanghai</Radio.Button>
  </Radio.Group>)

  return (
      <div className="sales-chart">
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card title="线上热门搜索" className="sales-chart-search" extra={<EllipsisOutlined />}>
              <Row>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  sdf
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  sdfs
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
                    onClick={onChart}
                    onGetG2Instance={chart => {
                      chart.on('afterrender', e => {
                        const geom = chart.get('geoms')[0]; // 获取所有的图形
                        const items = geom.get('data'); // 获取图形对应的数据
                        geom.setSelected(items[index]);
                      });
                    }}
                    data={dv}
                    scale={cols}
                    height={400} forceFit={true}
                    padding={"auto"}
                >
                  <Coord  type={"theta"} radius={0.75} innerRadius={0.7} />
                  <Axis name="percent" />
                  <Legend
                      itemTpl={'<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="cursor: pointer;font-size: 14px;">'
                      + '<i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>'
                      + '<span class="g2-legend-text">{value}</span>'
                      + '</li>'}
                      position="right-center"
                  />
                  <Tooltip
                      showTitle={false}
                      itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Guide>
                  <Guide.Text
                      top
                      position={['50%', '50%']}
                      content={count}
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