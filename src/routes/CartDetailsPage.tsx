import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { useCartQuery, useUpdateCartMutation } from '../api/carts'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Spinner } from '../components/ui/Spinner'
import { Table } from '../components/ui/Table'
import { formatNumber } from '../utils/number'

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const Meta = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};

  p {
    margin: 2px 0;
  }
`

export const CartDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: cart, isLoading, isError, error } = useCartQuery(id)
  const {
    mutate,
    isPending: isMutating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateCartMutation()

  const handleChangeQuantity = (productId: number, quantity: number) => {
    if (!id) return
    if (quantity < 0) return

    mutate({ id: Number(id), products: [{ id: productId, quantity }] })
  }

  const handleRemoveProduct = (productId: number) => {
    if (!id) return
    mutate({ id: Number(id), products: [{ id: productId, quantity: 0 }] })
  }

  if (isLoading && !cart) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <HeaderRow>
          <Button variant="secondary" onClick={() => navigate('/carts')}>
            Back to list
          </Button>
        </HeaderRow>
        <ErrorMessage>Error while loading cart: {(error as Error).message}</ErrorMessage>
      </div>
    )
  }

  if (!cart) {
    return (
      <div>
        <HeaderRow>
          <Button variant="secondary" onClick={() => navigate('/carts')}>
            Back to list
          </Button>
        </HeaderRow>
        <ErrorMessage>Cart not found</ErrorMessage>
      </div>
    )
  }

  return (
    <div>
      <HeaderRow>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Meta>
          <p>Cart ID: {cart.id}</p>
          <p>User ID: {cart.userId}</p>
          <p>
            Total products: {cart.totalProducts}, total quantity: {cart.totalQuantity}
          </p>
          <p>Total: {formatNumber(cart.total)}</p>
        </Meta>
      </HeaderRow>

      <Card>
        <h3 style={{ marginTop: 0 }}>Products</h3>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.products
              .filter((product) => product.quantity > 0)
              .map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{formatNumber(product.price)}</td>
                <td>{product.quantity}</td>
                <td>{formatNumber(product.total)}</td>
                <td>
                  <Button
                    variant="secondary"
                    disabled={isMutating}
                    onClick={() => handleChangeQuantity(product.id, product.quantity + 1)}
                  >
                    +
                  </Button>{' '}
                  <Button
                    variant="secondary"
                    disabled={isMutating || product.quantity <= 1}
                    onClick={() => handleChangeQuantity(product.id, product.quantity - 1)}
                  >
                    -
                  </Button>{' '}
                  <Button
                    variant="danger"
                    disabled={isMutating}
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {isUpdateError && (
          <ErrorMessage>
            Error while updating cart: {(updateError as Error).message}
          </ErrorMessage>
        )}

        {isMutating && (
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Spinner />
            <span style={{ fontSize: 12 }}>Updating cart...</span>
          </div>
        )}
      </Card>
    </div>
  )
}

