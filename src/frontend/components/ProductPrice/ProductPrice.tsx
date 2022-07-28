import { useCallback, useEffect, useMemo, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Money } from '../../protos/demo';
import { useCurrency } from '../../providers/Currency.provider';

interface IProps {
  price: Money;
}

const ProductPrice = ({ price }: IProps) => {
  const [{ units, currencyCode }, setParsedPrice] = useState<Money>(price);
  const { convert, selectedCurrency } = useCurrency();

  const convertPrice = useCallback(async () => {
    const result = await convert(price);

    setParsedPrice(result);
  }, [convert, price]);

  const currencySymbol = useMemo(
    () => getSymbolFromCurrency(currencyCode) || selectedCurrency,
    [currencyCode, selectedCurrency]
  );

  useEffect(() => {
    convertPrice();
  }, [selectedCurrency, price]);

  return (
    <span>
      {currencySymbol}{units}
    </span>
  );
};

export default ProductPrice;
