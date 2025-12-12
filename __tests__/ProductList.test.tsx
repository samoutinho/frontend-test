import { render, screen } from '@testing-library/react'
import ProductList from '@/components/ProductList'
import { useProductStore } from '@/store/productStore'

// Mock the store
jest.mock('@/store/productStore', () => ({
  useProductStore: jest.fn(),
}))

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const mockStore = {
      filteredProducts: [
        {
          id: '1',
          nome: 'Notebook Dell',
          categoria: 'Eletrônicos',
          preco: 2999.99,
          descricao: 'Notebook Dell Inspiron 15',
          imagem: 'https://via.placeholder.com/300x200',
        },
      ],
      currentPage: 1,
      itemsPerPage: 10,
      setPage: jest.fn(),
    }

    ;(useProductStore as jest.Mock).mockReturnValue(mockStore)

    const { container } = render(<ProductList />)
    expect(container).toMatchSnapshot()
  })

  it('should display no products message when list is empty', () => {
    const mockStore = {
      filteredProducts: [],
      currentPage: 1,
      itemsPerPage: 10,
      setPage: jest.fn(),
    }

    ;(useProductStore as jest.Mock).mockReturnValue(mockStore)

    render(<ProductList />)
    expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument()
  })
})

