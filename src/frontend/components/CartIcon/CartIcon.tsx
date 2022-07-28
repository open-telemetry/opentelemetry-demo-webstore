import { useState } from 'react';
import { useCart } from '../../providers/Cart.provider';
import CartDropdown from '../CartDropdown';
import * as S from './CartIcon.styled';

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    cart: { items },
  } = useCart();

  return (
    <>
      <S.CartIcon onClick={() => !!items.length && setIsOpen(true)}>
        <S.Icon src="/icons/Hipster_CartIcon.svg" alt="Cart icon" title="Cart" />
        {!!items.length && <S.ItemsCount>{items.length}</S.ItemsCount>}
      </S.CartIcon>
      <CartDropdown productList={items} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CartIcon;
