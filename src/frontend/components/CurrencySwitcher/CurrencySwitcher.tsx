import { useCurrency } from '../../providers/Currency.provider';
import * as S from './CurrencySwitcher.styled';

const CurrencySwitcher = () => {
  const { currencyCodeList, setSelectedCurrency, selectedCurrency } = useCurrency();

  return (
    <S.CurrencySwitcher>
      <S.Container>
        <S.SelectedConcurrency>$</S.SelectedConcurrency>
        <S.Select
          name="currency_code"
          onChange={event => setSelectedCurrency(event.target.value)}
          value={selectedCurrency}
        >
          {currencyCodeList.map(currencyCode => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </S.Select>
        <S.Arrow />
      </S.Container>
    </S.CurrencySwitcher>
  );
};

export default CurrencySwitcher;
