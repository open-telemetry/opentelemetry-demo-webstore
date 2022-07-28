import styled from 'styled-components';

export const Footer = styled.footer`
  padding: 65px 9%;
  background-color: ${({ theme }) => theme.colors.otelGray};

  * {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.sizes.dSmall};
    font-weight: ${({ theme }) => theme.fonts.regular};
  }
`;
