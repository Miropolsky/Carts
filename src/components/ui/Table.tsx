import styled from '@emotion/styled'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 8px 10px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mutedText};
    background: ${({ theme }) => theme.colors.background};
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`


