import { TCurrencyRate } from "../../App";
import Logo from "../../assets/curryLogo.png";
import Loader from "../Loader/Loader";
import style from "./Header.module.css";

type TCurrHeaderProps = {
  currencyRates: TCurrencyRate[];
  isCurrencyLoading: boolean;
  fetchCurrencyError: string;
};

const Header = ({
  currencyRates,
  isCurrencyLoading,
  fetchCurrencyError,
}: TCurrHeaderProps) => (
  <header>
    <div className={style.logo__container}>
      <img className={style.logo} src={Logo} alt="logo" />
      <h5>Currency converter</h5>
    </div>
    <div className={style.currency__container}>
      {isCurrencyLoading && <Loader />}
      {fetchCurrencyError && (
        <span className={style.currency__error}>{fetchCurrencyError}</span>
      )}
      {currencyRates.map(
        ({ cc, rate }) =>
          cc !== "UAH" && (
            <div key={cc}>
              1 {cc} / {rate.toFixed(2)} UAH
            </div>
          )
      )}
    </div>
  </header>
);

export default Header;
