const formattedExpDate = date => {
  const splitDate = date.split('/');
  const dateString = splitDate[0] + '/' + '01' + '/' + splitDate[1];
  const fullDate = new Date(dateString);
  return fullDate;
}

export default { formattedExpDate }