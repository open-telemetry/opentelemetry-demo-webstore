import styled from 'styled-components';
import RouterLink from 'next/link';

export const Ad = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.colors.otelYellow};
  font-size: ${({ theme }) => theme.sizes.dMedium};
  text-align: center;
  padding: 48px;

  * {
    color: ${({ theme }) => theme.colors.white};
    margin: 0;
    cursor: pointer;
  }
`;

export const Link = styled(RouterLink)`
  color: black;
`;
