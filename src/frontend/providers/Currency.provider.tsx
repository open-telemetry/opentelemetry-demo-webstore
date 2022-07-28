import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import ApiGateway from '../gateways/Api.gateway';
import SessionGateway from '../gateways/Session.gateway';
import { Money } from '../protos/demo';

const { currencyCode = 'USD' } = SessionGateway.getSession();

interface IContext {
  currencyCodeList: string[];
  convert(from: Money): Promise<Money>;
  setSelectedCurrency(currency: string): void;
  selectedCurrency: string;
}

export const Context = createContext<IContext>({
  currencyCodeList: [],
  selectedCurrency: 'USD',
  convert: () => Promise.resolve({ currencyCode: '', units: 0, nanos: 0 }),
  setSelectedCurrency: () => ({}),
});

interface IProps {
  children: React.ReactNode;
}

export const useCurrency = () => useContext(Context);

const CurrencyProvider = ({ children }: IProps) => {
  const { data: currencyCodeList = [] } = useQuery('currency', ApiGateway.getSupportedCurrencyList);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(currencyCode);
  const convertMutation = useMutation(ApiGateway.convertToCurrency);

  const convert = useCallback(
    (from: Money) => convertMutation.mutateAsync({ from, toCode: selectedCurrency }),
    [convertMutation, selectedCurrency]
  );

  const onSelectCurrency = useCallback((currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    SessionGateway.setSessionValue('currencyCode', currencyCode);
  }, []);

  const value = useMemo(
    () => ({
      convert,
      currencyCodeList,
      selectedCurrency,
      setSelectedCurrency: onSelectCurrency,
    }),
    [convert, currencyCodeList, selectedCurrency, onSelectCurrency]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default CurrencyProvider;
