import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { IProductCartItem } from '../../types/Cart';
import ProductPrice from '../ProductPrice';
import * as S from './CartDropdown.styled';

interface IProps {
  isOpen: boolean;
  onClose(): void;
  productList: IProductCartItem[];
}

const CartDropdown = ({ productList, isOpen, onClose }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return isOpen ? (
    <S.CartDropdown ref={ref}>
      <div>
        <S.Header>
          <S.Title>Shopping Cart</S.Title>
          <span onClick={onClose}>Close</span>
        </S.Header>
        <S.ItemList>
          {productList.map(
            ({ quantity, product: { name, picture, id, priceUsd = { nanos: 0, currencyCode: 'USD', units: 0 } } }) => (
              <S.Item key={id}>
                <S.ItemImage src={picture} alt={name} />
                <S.ItemDetails>
                  <S.ItemName>{name}</S.ItemName>
                  <ProductPrice price={priceUsd} />
                  <S.ItemQuantity>Quantity: {quantity}</S.ItemQuantity>
                </S.ItemDetails>
              </S.Item>
            )
          )}
        </S.ItemList>
      </div>
      <Link href="/cart">
        <S.CartButton>Go to Shipping Data</S.CartButton>
      </Link>
    </S.CartDropdown>
  ) : null;
};

export default CartDropdown;
