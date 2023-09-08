function format(date, formatStr) {
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 1).toString();
  var day = date.getDate().toString();

  // 处理月份和日期为单数的情况，需要在前面加上 '0'
  if (month.length === 1) {
    month = "0" + month;
  }
  if (day.length === 1) {
    day = "0" + day;
  }

  // 替换格式字符串中的占位符
  var formattedDate = formatStr.replace("YYYY", year);
  formattedDate = formattedDate.replace("MM", month);
  formattedDate = formattedDate.replace("DD", day);

  return formattedDate;
}

console.log(format(new Date(), "YYYY-MM-DD"));
