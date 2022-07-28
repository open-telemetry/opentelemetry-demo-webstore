import Image from 'next/image';
import styled from 'styled-components';

export const CartIcon = styled.a`
  position: relative;
  display: block;
  margin-left: 25px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Icon = styled(Image).attrs({
  width: '24px',
  height: '24px',
})`
  margin-bottom: 3px;
`;

export const ItemsCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 9px;
  left: 15px;
  width: 15px;
  height: 15px;
  font-size: ${({ theme }) => theme.sizes.nano};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.otelRed};
`;
