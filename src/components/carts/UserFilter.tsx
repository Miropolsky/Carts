import styled from '@emotion/styled'

const Input = styled.input`
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  width: 120px;
`

type Props = {
  value: string | null
  onChange: (value: string | null) => void
}

export const UserFilter = ({ value, onChange }: Props) => {
  return (
    <label>
      User ID:{' '}
      <Input
        type="number"
        value={value ?? ''}
        onChange={(e) => {
          const next = e.target.value
          onChange(next === '' ? null : next)
        }}
        placeholder="Any"
      />
    </label>
  )
}


