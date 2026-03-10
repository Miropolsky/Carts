import styled from '@emotion/styled'
import type { PropsWithChildren } from 'react'

const Root = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`

const Shell = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px 40px;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`

const Subtitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`

const Main = styled.main`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 20px 20px 24px;
`

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Root>
      <Shell>
        <Header>
          <div>
            <Title>Carts Dashboard</Title>
          </div>
        </Header>
        <Main>{children}</Main>
      </Shell>
    </Root>
  )
}


