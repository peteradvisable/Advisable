export const currencySymbol = currency => symbols[currency] || currency || "€"

export default (amount, currency = "EUR") => {
  const symbol = currencySymbol(currency.toUpperCase())
  let commaSeparated = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (symbol != null) {
    return `${symbol}${commaSeparated}`;
  } else {
    return `${commaSeparated} ${currency}`;
  }
};

const symbols = {
  ILS: "₪",
  PEN: "S/.",
  USD: "$",
  EUR: "€",
  AFN: "؋",
  NZD: "$",
  HNL: "L",
  SBD: "$",
  AUD: "$",
  YER: "﷼",
  MKD: "ден",
  NPR: "₨",
  CRC: "₡",
  TRY: "TL",
  KGS: "лв",
  XCD: "$",
  UAH: "₴",
  ANG: "ƒ",
  GBP: "£",
  QAR: "﷼",
  FKP: "£",
  BMD: "$",
  JMD: "J$",
  CAD: "$",
  BBD: "$",
  CNY: "¥",
  UZS: "лв",
  KPW: "₩",
  SGD: "$",
  PLN: "zł",
  RUB: "руб",
  HRK: "kn",
  SYP: "£",
  JPY: "¥",
  RON: "lei",
  SRD: "$",
  TWD: "NT$",
  THB: "฿",
  KYD: "$",
  NOK: "kr",
  EGP: "£",
  SCR: "₨",
  MZN: "MT",
  BGN: "лв",
  SAR: "﷼",
  BND: "$",
  MYR: "RM",
  CZK: "Kč",
  MNT: "₮",
  ALL: "Lek",
  OMR: "﷼",
  BZD: "BZ$",
  SHP: "£",
  LRD: "$",
  SOS: "S",
  RSD: "Дин.",
  HUF: "Ft",
  BAM: "KM",
  FJD: "$",
  LKR: "₨",
  MUR: "₨",
  PKR: "₨",
  KZT: "лв",
  ISK: "kr",
  SEK: "kr",
  PYG: "Gs",
  VEF: "Bs",
  BSD: "$",
  GTQ: "Q",
  DKK: "kr",
  AWG: "ƒ",
  KRW: "₩",
  VND: "₫",
  DOP: "RD$",
  ARS: "$",
  ZAR: "R",
  LAK: "₭",
  BRL: "R$",
  AZN: "ман",
  BWP: "P",
  KHR: "៛",
  TTD: "TT$",
  LBP: "£",
  HKD: "$",
  NIO: "C$",
  IDR: "Rp",
  GIP: "£",
  IRR: "﷼",
  NGN: "₦",
  GYD: "$"
};
