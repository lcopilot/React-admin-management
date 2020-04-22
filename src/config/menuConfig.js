import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  DashboardOutlined, FileProtectOutlined,
  HomeOutlined, LineChartOutlined, ShoppingOutlined, UserOutlined
} from "@ant-design/icons";

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: HomeOutlined, // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '仪表盘',
    key: '/dashboard',
    icon: DashboardOutlined,
    children: [ // 子菜单列表
      {
        title: '分析',
        key: '/dashboard/analysis',
        icon: AreaChartOutlined
      },
      {
        title: '实时监控',
        key: '/dashboard/monitor',
        icon: LineChartOutlined
      },
    ]
  },
  {
    title: '商品',
    key: '/products',
    icon: AppstoreOutlined,
    children: [ // 子菜单列表
      {
        title: '分类管理',
        key: '/products/category',
        icon: AppstoreAddOutlined
      },
      {
        title: '商品管理',
        key: '/products/product',
        icon: ShoppingOutlined
      },
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: UserOutlined
  },
  {
    title: '角色管理',
    key: '/role',
    icon: UserOutlined,
  },
  {
    title: '订单管理',
    key: '/order',
    icon: FileProtectOutlined,
  },
]

export default menuList