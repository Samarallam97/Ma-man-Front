import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiStar } from 'react-icons/fi'
import { rateModule } from '../../services/moduleService'

function ModuleRating({ moduleId, initialRating }) {
  const { t } = useTranslation()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleRating = async () => {
    if (rating === 0 || hasRated || isSubmitting) return
    
    try {
      setIsSubmitting(true)
      await rateModule(moduleId, rating)
      setHasRated(true)
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error submitting rating:', error)
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
      {hasRated ? (
        <div className="text-center py-4">
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`text-accent-500 ${i < rating ? 'fill-current' : ''}`}
                size={32}
              />
            ))}
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Thank you for your rating!
          </p>
        </div>
      ) : (
        <div>
          <p className="text-center mb-4 text-neutral-600 dark:text-neutral-400">
            {t('moduleContent.yourRating')}
          </p>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1
              return (
                <FiStar
                  key={i}
                  className={`cursor-pointer mx-1 transition-all duration-200 ${
                    (hover || rating) >= ratingValue 
                      ? 'text-accent-500 fill-current' 
                      : 'text-neutral-400 dark:text-neutral-600'
                  }`}
                  size={32}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              )
            })}
          </div>
          <div className="text-center">
            <button
              onClick={handleRating}
              disabled={rating === 0 || isSubmitting}
              className={`btn-primary ${
                rating === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : t('moduleContent.submit')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModuleRating