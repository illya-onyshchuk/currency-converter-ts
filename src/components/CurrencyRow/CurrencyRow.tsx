import React from "react";
import style from "./CurrencyRow.module.css";
import { TCurrencyRate } from "../../App";

type TCurrencyRowProps = {
  amount: string | number;
  selectedCurrency: string;
  keyword: string;
  currencyRates: TCurrencyRate[];
  onChangeAmount: (arg1: string, arg2: string) => void;
  onChangeCurrency: (arg: string, arg2: string) => void;
};

const CurrencyRow = (props: TCurrencyRowProps) => {
  const {
    amount,
    selectedCurrency,
    onChangeAmount,
    onChangeCurrency,
    currencyRates,
    keyword,
  } = props;

  const isCurrency = currencyRates?.length;

  return (
    <div className={style.input__container}>
      <input
        disabled={!isCurrency}
        type="number"
        placeholder="Enter amount"
        className={style.currency__input}
        value={amount}
        onChange={(e) => onChangeAmount(e.target.value, keyword)}
      />
      <select
        disabled={!isCurrency}
        value={selectedCurrency}
        onChange={(e) => onChangeCurrency(e.target.value, keyword)}
      >
        {isCurrency &&
          currencyRates.map((rate) => (
            <option key={rate.cc} value={rate.cc}>
              {rate.cc}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
