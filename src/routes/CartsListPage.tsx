import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { useCartsQuery } from '../api/carts'
import { LimitSelect } from '../components/carts/LimitSelect'
import { UserFilter } from '../components/carts/UserFilter'
import { Button } from '../components/ui/Button'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Spinner } from '../components/ui/Spinner'
import { Table } from '../components/ui/Table'
import { useCartsListStore } from '../store/cartsListStore'
import { formatNumber } from '../utils/number'

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
`

const Filters = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`

export const CartsListPage = () => {
  const { page, limit, userIdFilter, setPage, setLimit, setUserIdFilter } = useCartsListStore()

  const { data, isLoading, isError, error, isFetching } = useCartsQuery({
    page,
    limit,
    userIdFilter,
  })

  const total = data?.total ?? 0
  const totalPages = total > 0 ? Math.ceil(total / limit) : 1

  return (
    <div>
      <Toolbar>
        <h2 style={{ margin: 0 }}>Carts</h2>
        <Filters>
          <UserFilter value={userIdFilter} onChange={setUserIdFilter} />
          <LimitSelect value={limit} onChange={setLimit} />
        </Filters>
      </Toolbar>

      {isError && (
        <ErrorMessage>Error while loading carts: {(error as Error).message}</ErrorMessage>
      )}

      {isLoading && !data ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
          <Spinner />
        </div>
      ) : (
        data && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Products count</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.carts.map((cart) => (
                  <tr key={cart.id}>
                    <td>{cart.id}</td>
                    <td>{cart.userId}</td>
                    <td>{cart.totalProducts}</td>
                    <td>{formatNumber(cart.total)}</td>
                    <td>
                      <Button variant="secondary" as={Link} to={`/carts/${cart.id}`}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
              <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                Prev
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
                Next
              </Button>
              {isFetching && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Spinner /> <span style={{ fontSize: 12 }}>Updating...</span>
                </span>
              )}
            </Pagination>
          </>
        )
      )}
    </div>
  )
}
