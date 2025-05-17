import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CategoryCard from '../../components/categories/CategoryCard'
import CategoryFilter from '../../components/categories/CategoryFilter'
import Pagination from '../../components/common/Pagination'
import { fetchCategories } from '../../services/categoryService'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'

function CategoriesPage() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(8)

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true)
        const data = await fetchCategories()
        setCategories(data)
        setFilteredCategories(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    getCategories()
  }, [])

  // Filter categories when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCategories(categories)
    } else {
      const filtered = categories.filter(category => 
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCategories(filtered)
    }
    setCurrentPage(1)
  }, [searchTerm, categories])

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  if (loading) return <LoadingSpinner />
  
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-4 md:mb-0">
          {t('categories.title')}
        </h1>
        <CategoryFilter 
          onSearch={handleSearch} 
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {currentCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
            {t('categories.emptyState')}
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 mt-2">
            {t('categories.tryAgain')}
          </p>
        </div>
      )}

      {filteredCategories.length > itemsPerPage && (
        <div className="mt-8">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default CategoriesPage