import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi'

function VideoContent({ videos }) {
  const { t } = useTranslation()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [completed, setCompleted] = useState([])
  
  const currentVideo = videos[currentVideoIndex]
  const isLastVideo = currentVideoIndex === videos.length - 1
  
  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      // Mark current video as completed when moving to next
      if (!completed.includes(currentVideoIndex)) {
        setCompleted([...completed, currentVideoIndex])
      }
      setCurrentVideoIndex(currentVideoIndex + 1)
      window.scrollTo(0, 0)
    }
  }
  
  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1)
      window.scrollTo(0, 0)
    }
  }
  
  const handleComplete = () => {
    if (!completed.includes(currentVideoIndex)) {
      setCompleted([...completed, currentVideoIndex])
    }
  }
  
  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index)
    window.scrollTo(0, 0)
  }
  
  return (
    <div>
      {videos.length > 0 ? (
        <div>
          <div className="mb-6">
            {/* Video player */}
            <div className="aspect-w-16 aspect-h-9 mb-4 bg-neutral-900 rounded-lg overflow-hidden">
              <iframe
                src={currentVideo.embedUrl}
                title={currentVideo.title}
                className="w-full h-[400px] border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Video info */}
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
              {currentVideo.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              {currentVideo.description}
            </p>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentVideoIndex === 0}
                className={`btn-outline flex items-center ${
                  currentVideoIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiChevronLeft className="mr-1" />
                {t('moduleContent.previous')}
              </button>
              
              {isLastVideo ? (
                <button
                  onClick={handleComplete}
                  className={`btn-primary flex items-center ${
                    completed.includes(currentVideoIndex) 
                      ? 'bg-success-500 hover:bg-success-500' 
                      : ''
                  }`}
                >
                  {completed.includes(currentVideoIndex) ? (
                    <>
                      <FiCheckCircle className="mr-1" />
                      {t('moduleContent.complete')}
                    </>
                  ) : (
                    t('moduleContent.markAsComplete')
                  )}
                </button>
              ) : (
                <button onClick={handleNext} className="btn-primary flex items-center">
                  {t('moduleContent.next')}
                  <FiChevronRight className="ml-1" />
                </button>
              )}
            </div>
          </div>
          
          {/* Video playlist */}
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
            <h4 className="font-medium mb-3">
              Videos ({currentVideoIndex + 1}/{videos.length})
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {videos.map((video, index) => (
                <div
                  key={index}
                  onClick={() => handleVideoSelect(index)}
                  className={`flex items-start p-3 rounded-md cursor-pointer ${
                    currentVideoIndex === index
                      ? 'bg-primary-100 dark:bg-primary-900'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <div className="flex-shrink-0 w-24 h-16 bg-neutral-200 dark:bg-neutral-700 rounded overflow-hidden mr-3">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-medium text-sm mb-1 line-clamp-2">
                      {video.title}
                    </h5>
                    <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                      <span>{video.duration}</span>
                      {completed.includes(index) && (
                        <span className="ml-2 flex items-center text-success-500">
                          <FiCheckCircle className="mr-1" />
                          {t('moduleContent.complete')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">
            {t('moduleContent.noContent')}
          </p>
        </div>
      )}
    </div>
  )
}

export default VideoContent