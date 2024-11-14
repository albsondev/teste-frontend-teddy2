export const moneyMask = (value: string) => {
  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat("pt-BR", options).format(
    parseFloat(value) / 100
  );
  console.log(typeof result, result);
  return "R$ " + (result === "NaN" ? "0,00" : result);
};
