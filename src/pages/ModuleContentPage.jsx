import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fetchModuleById } from '../services/moduleService'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import VideoContent from '../components/content/VideoContent'
import BookContent from '../components/content/BookContent'
import AudioContent from '../components/content/AudioContent'
import ModuleComments from '../components/content/ModuleComments'
import ModuleRating from '../components/content/ModuleRating'

function ModuleContentPage() {
  const { t } = useTranslation()
  const { moduleId } = useParams()
  const [module, setModule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('videos')

  useEffect(() => {
    const getModuleDetails = async () => {
      try {
        setLoading(true)
        const data = await fetchModuleById(moduleId)
        setModule(data)
        
        // Set initial active tab based on available content
        if (data.videos && data.videos.length > 0) {
          setActiveTab('videos')
        } else if (data.books && data.books.length > 0) {
          setActiveTab('books')
        } else if (data.audio && data.audio.length > 0) {
          setActiveTab('audio')
        }
        
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    getModuleDetails()
  }, [moduleId])

  if (loading) return <LoadingSpinner />
  
  if (error) return <ErrorMessage message={error} />

  const renderContent = () => {
    switch (activeTab) {
      case 'videos':
        return <VideoContent videos={module.videos} />
      case 'books':
        return <BookContent books={module.books} />
      case 'audio':
        return <AudioContent audio={module.audio} />
      default:
        return <div>{t('moduleContent.noContent')}</div>
    }
  }

  const hasContent = (contentType) => {
    return module[contentType] && module[contentType].length > 0
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2">
          {module.title}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {module.description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm">
            {module.category}
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm flex items-center">
            <span>{t('moduleContent.averageRating')}:</span>
            <span className="font-semibold ml-1 text-accent-500">{module.rating.toFixed(1)}</span>
            <span className="mx-1 text-neutral-400 dark:text-neutral-600">/</span>
            <span>5</span>
            <span className="ml-1">({module.ratingCount})</span>
          </div>
        </div>
      </div>

      {/* Content type tabs */}
      <div className="mb-6 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'videos'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            } ${!hasContent('videos') ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => hasContent('videos') && setActiveTab('videos')}
            disabled={!hasContent('videos')}
          >
            {t('moduleContent.videos')}
            {!hasContent('videos') && ` (${t('moduleContent.noContent')})`}
          </button>
          
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'books'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            } ${!hasContent('books') ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => hasContent('books') && setActiveTab('books')}
            disabled={!hasContent('books')}
          >
            {t('moduleContent.books')}
            {!hasContent('books') && ` (${t('moduleContent.noContent')})`}
          </button>
          
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'audio'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            } ${!hasContent('audio') ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => hasContent('audio') && setActiveTab('audio')}
            disabled={!hasContent('audio')}
          >
            {t('moduleContent.audio')}
            {!hasContent('audio') && ` (${t('moduleContent.noContent')})`}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="mb-8">
        {renderContent()}
      </div>

      {/* Rating section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {t('moduleContent.rating')}
        </h2>
        <ModuleRating moduleId={module.id} initialRating={module.rating} />
      </div>

      {/* Comments section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {t('comments.title')}
        </h2>
        <ModuleComments moduleId={module.id} />
      </div>
    </div>
  )
}

export default ModuleContentPage