import styled from '@emotion/styled'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
  // поддержка пропса "to" при использовании через `as={Link}`
  to?: string
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease,
    transform 0.05s ease,
    box-shadow 0.1s ease;
  font-weight: 500;

  ${({ theme, variant = 'primary' }) => {
    if (variant === 'secondary') {
      return `
        background: transparent;
        color: ${theme.colors.text};
        border-color: ${theme.colors.border};

        &:hover:enabled {
          background: ${theme.colors.background};
        }

        &:active:enabled {
          background: ${theme.colors.background};
          transform: translateY(1px);
          box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.18);
        }
      `
    }

    if (variant === 'danger') {
      return `
        background: ${theme.colors.danger};
        color: white;

        &:hover:enabled {
          background: ${theme.colors.dangerHover};
        }

        &:active:enabled {
          background: ${theme.colors.dangerHover};
          transform: translateY(1px);
          box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.3);
        }
      `
    }

    return `
      background: ${theme.colors.primary};
      color: white;

      &:hover:enabled {
        background: ${theme.colors.primaryHover};
      }

      &:active:enabled {
        background: ${theme.colors.primaryHover};
        transform: translateY(1px);
        box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.3);
      }
    `
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`


