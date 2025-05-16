import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'

function ModuleFilter({ onSearch, itemsPerPage, onItemsPerPageChange }) {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleItemsPerPageChange = (e) => {
    onItemsPerPageChange(e.target.value)
  }

  return (
    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder={t('modules.search')}
          value={searchTerm}
          onChange={handleSearchChange}
          className="input pl-10 w-full"
        />
      </div>
      
      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className="input appearance-none pr-8 bg-no-repeat bg-right"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundPosition: "right 0.5rem center"
        }}
      >
        <option value="4">4 {t('modules.perPage')}</option>
        <option value="8">8 {t('modules.perPage')}</option>
        <option value="12">12 {t('modules.perPage')}</option>
        <option value="16">16 {t('modules.perPage')}</option>
      </select>
    </div>
  )
}

export default ModuleFilter