//时间格式化
export const TIME_FORMAT='YYYY-MM-DD HH:mm:ss'
//分页相关参数
export const PAGINATION={
  PAGE_SIZE:6,
  PAGE_SIZE_OPTIONS:['6', '10', '15', '30'],
  SHOW_TOTAL:(total)=>{
    return `共 ${total} 条 `
  },
}