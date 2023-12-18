import { useEffect, useState } from "react";
import Header from "./components/CurrHeader/Header";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import { getCurrencyRates } from "./services/api";

export type TCurrencyRate = {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
};

const currencyList = ["USD", "EUR"];

function App() {
  const [currency, setCurrency] = useState<TCurrencyRate[]>([]);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  const [fetchCurrencyError, setFetchCurrencyError] = useState("");

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        setIsCurrencyLoading(true);
        const response = await getCurrencyRates();
        const normalizeData: TCurrencyRate[] =
          response?.data?.filter((el: TCurrencyRate) =>
            currencyList.includes(el.cc)
          ) || [];

        setIsCurrencyLoading(false);
        setCurrency([
          ...normalizeData,
          {
            cc: "UAH",
            rate: 1,
            txt: "Українська гривня",
            r030: 980,
            exchangedate: "",
          },
        ]);
      } catch (e) {
        setIsCurrencyLoading(false);
        setFetchCurrencyError("Fetching currency error!");
      }
    };

    fetchCurrencyRates();
  }, []);

  return (
    <>
      <Header
        currencyRates={currency}
        isCurrencyLoading={isCurrencyLoading}
        fetchCurrencyError={fetchCurrencyError}
      />
      <div className="container">
        <CurrencyConverter currencyRates={currency} />
      </div>
    </>
  );
}

export default App;
