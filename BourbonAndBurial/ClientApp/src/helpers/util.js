const formattedExpDate = date => {
  const splitDate = date.split('/');
  const dateString = splitDate[0] + '/' + '01' + '/' + splitDate[1];
  const fullDate = new Date(dateString);
  return fullDate;
}

const maskCreditCard = (cardNum) => {
  const cardString = cardNum.toString();
  return cardString.replace(/\d{4}(?=.)/g, 'XXXX ');
}

export default {
  formattedExpDate,
  maskCreditCard
}