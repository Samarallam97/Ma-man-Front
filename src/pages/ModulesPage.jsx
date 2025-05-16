import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ModuleCard from '../components/modules/ModuleCard'
import ModuleFilter from '../components/modules/ModuleFilter'
import Pagination from '../components/common/Pagination'
import { fetchModules } from '../services/moduleService'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

function ModulesPage() {
  const { t } = useTranslation()
  const [modules, setModules] = useState([])
  const [filteredModules, setFilteredModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(8)

  // Fetch modules on component mount
  useEffect(() => {
    const getModules = async () => {
      try {
        setLoading(true)
        const data = await fetchModules()
        setModules(data)
        setFilteredModules(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    getModules()
  }, [])

  // Filter modules when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredModules(modules)
    } else {
      const filtered = modules.filter(module => 
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredModules(filtered)
    }
    setCurrentPage(1)
  }, [searchTerm, modules])

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentModules = filteredModules.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredModules.length / itemsPerPage)

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
          {t('modules.title')}
        </h1>
        <ModuleFilter 
          onSearch={handleSearch} 
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {currentModules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentModules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
            {t('modules.emptyState')}
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 mt-2">
            {t('modules.tryAgain')}
          </p>
        </div>
      )}

      {filteredModules.length > itemsPerPage && (
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

export default ModulesPage