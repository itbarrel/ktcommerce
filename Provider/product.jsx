import React, { createContext, useState, useEffect, useRef } from 'react'
import { fetchProducts } from '../services/product'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [noMoreProducts, setNoMoreProducts] = useState(false)
  const pageRef = useRef(1)

  const fetchAllProducts = async (page = 1, reset = false, categoryId = null) => {
    try {
      setLoading(true)
      const res = await fetchProducts({ page, category: categoryId })

      if (res.length === 0) {
        setNoMoreProducts(true)
      }

      if (reset) {
        setProducts(res)
      } else {
        const newProducts = res.filter(
          (newProduct) => !products.some((product) => product.id === newProduct.id)
        )
        setProducts((prevProducts) => [...prevProducts, ...newProducts])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = (categoryId = null) => {
    if (!noMoreProducts && !loading) {
      pageRef.current += 1
      fetchAllProducts(pageRef.current, categoryId)
    }
  }

  useEffect(() => {
    fetchAllProducts(1, true)
  }, [])

  return (
    <ProductContext.Provider value={{ products, loading, handleLoadMore, noMoreProducts, fetchAllProducts }}>
      {children}
    </ProductContext.Provider>
  )
}
