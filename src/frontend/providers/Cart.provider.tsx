import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ApiGateway from '../gateways/Api.gateway';
import { CartItem, OrderResult, PlaceOrderRequest } from '../protos/demo';
import { IProductCart } from '../types/Cart';

interface IContext {
  cart: IProductCart;
  addItem(item: CartItem): void;
  emptyCart(): void;
  placeOrder(order: PlaceOrderRequest): Promise<OrderResult>;
}

export const Context = createContext<IContext>({
  cart: { userId: '', items: [] },
  addItem: () => {},
  emptyCart: () => {},
  placeOrder: () => Promise.resolve({} as OrderResult),
});

interface IProps {
  children: React.ReactNode;
}

export const useCart = () => useContext(Context);

const CartProvider = ({ children }: IProps) => {
  const queryClient = useQueryClient();
  const mutationOptions = useMemo(
    () => ({
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
    }),
    [queryClient]
  );

  const { data: cart = { userId: '', items: [] } } = useQuery('cart', ApiGateway.getCart);
  const addCartMutation = useMutation(ApiGateway.addCartItem, mutationOptions);
  const emptyCartMutation = useMutation(ApiGateway.emptyCart, mutationOptions);
  const placeOrderMutation = useMutation(ApiGateway.placeOrder, mutationOptions);

  const addItem = useCallback((item: CartItem) => addCartMutation.mutateAsync(item), [addCartMutation]);
  const emptyCart = useCallback(() => emptyCartMutation.mutateAsync(), [emptyCartMutation]);
  const placeOrder = useCallback(
    (order: PlaceOrderRequest) => placeOrderMutation.mutateAsync(order),
    [placeOrderMutation]
  );

  const value = useMemo(() => ({ cart, addItem, emptyCart, placeOrder }), [cart, addItem, emptyCart]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default CartProvider;
