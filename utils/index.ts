export const isBase64Regex = (value: string) => {
  const base64Regex = /^data:image\/[a-z]+;base64,/;
  return base64Regex.test(value);
};
