import React, { useMemo, useState } from "react";
import CurrencyRow from "../CurrencyRow/CurrencyRow";

import style from "./CurrencyConverter.module.css";
import arrowConverter from "../../assets/arrow_converter.png";
import { TCurrencyRate } from "../../App";

type TCurrencyConverterProps = {
  currencyRates: TCurrencyRate[];
};

// type TCurrencyRatesMap = {
//   [cc: string]: TCurrencyRate;
// };

const CurrencyConverter = ({ currencyRates }: TCurrencyConverterProps) => {
  const [amountFrom, setAmountFrom] = useState<string | number>("");
  const [amountTo, setAmountTo] = useState<string | number>("");
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("USD");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("UAH");

  const currencyRatesMap = useMemo(() => {
    const result: Record<string, number> = {};

    currencyRates.forEach(({ cc, rate }) => {
      result[cc] = rate;
    });

    return result;
  }, [currencyRates]);

  const handleAmountChange = (value: string, field: string) => {
    if (value === "") {
      setAmountFrom("");
      setAmountTo("");
      return;
    }

    const test = value.replace(/[^\d,.]/g, "").trim();
    const amount = parseFloat(test);

    if (field === "from") {
      setAmountFrom(test);
      const converted = (
        (amount * currencyRatesMap[selectedCurrencyFrom]) /
        currencyRatesMap[selectedCurrencyTo]
      ).toFixed(2);
      console.log("ConvertedFrom", typeof converted);
      setAmountTo(converted);
      // isNaN(converted) ? setAmountTo("") : setAmountTo(converted);
    }

    if (field === "to") {
      setAmountTo(test);
      const converted = (
        (amount * currencyRatesMap[selectedCurrencyTo]) /
        currencyRatesMap[selectedCurrencyFrom]
      ).toFixed(2);
      setAmountFrom(converted);
    }
  };

  const handleCurrencyChange = (value: string, field: string) => {
    if (field === "from") {
      setSelectedCurrencyFrom(value);
    } else if (field === "to") {
      setSelectedCurrencyTo(value);
    }
    setAmountFrom("");
    setAmountTo("");
  };

  const handleClick = () => {
    setAmountFrom(amountTo);
    setAmountTo(amountFrom);
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
  };

  return (
    <div className={style.converter__container}>
      <CurrencyRow
        amount={amountFrom}
        selectedCurrency={selectedCurrencyFrom}
        onChangeAmount={handleAmountChange}
        onChangeCurrency={handleCurrencyChange}
        currencyRates={currencyRates}
        keyword={"from"}
      />

      <button className={style.convert__button} onClick={handleClick}>
        <img src={arrowConverter} alt="arrow Converter" />
      </button>

      <CurrencyRow
        amount={amountTo}
        selectedCurrency={selectedCurrencyTo}
        onChangeAmount={handleAmountChange}
        onChangeCurrency={handleCurrencyChange}
        currencyRates={currencyRates}
        keyword={"to"}
      />
    </div>
  );
};

export default CurrencyConverter;
