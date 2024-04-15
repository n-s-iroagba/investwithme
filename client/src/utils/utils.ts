

export const numberWithCommas = (number:number) => {
  const str = String(number);
  let formatted = '';
  for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
    formatted = str[i] + formatted;
    if (count % 3 === 2 && i !== 0) {
      formatted = ',' + formatted;
    }
  }
  return formatted;
};