import styled from '@emotion/styled'

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`


