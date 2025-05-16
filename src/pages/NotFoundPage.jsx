import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiAlertCircle } from 'react-icons/fi'

function NotFoundPage() {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <FiAlertCircle size={64} className="text-primary-500 mb-6" />
      <h1 className="text-4xl font-bold text-neutral-800 dark:text-white mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
        {t('errors.notFound')}
      </h2>
      <Link to="/" className="btn-primary">
        {t('errors.goHome')}
      </Link>
    </div>
  )
}

export default NotFoundPage