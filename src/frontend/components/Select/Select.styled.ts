import styled from 'styled-components';

export const Select = styled.select`
  width: 100%;
  height: 45px;
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  padding: 10px 16px;
  border-radius: 8px;
  position: relative;
  width: 100px;
  cursor: pointer;
`;

export const SelectContainer = styled.div`
  position: relative;
  width: min-content;
`;

export const Arrow = styled.img.attrs({
  src: '/icons/Chevron.svg',
  alt: 'select',
})`
  position: absolute;
  right: 25px;
  top: 20px;
  width: 10px;
  height: 5px;
`;
