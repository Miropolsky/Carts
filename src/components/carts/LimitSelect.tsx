import styled from '@emotion/styled'

const Select = styled.select`
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
`

type Props = {
  value: number
  onChange: (value: number) => void
}

export const LimitSelect = ({ value, onChange }: Props) => {
  return (
    <label>
      Per page:{' '}
      <Select
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value))
        }}
      >
        {[5, 10, 20].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </label>
  )
}


