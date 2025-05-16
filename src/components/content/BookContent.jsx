import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi'

function BookContent({ books }) {
  const { t } = useTranslation()
  const [currentBookIndex, setCurrentBookIndex] = useState(0)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [completedBooks, setCompletedBooks] = useState([])
  
  const currentBook = books[currentBookIndex]
  
  const isLastPage = currentPageIndex === (currentBook?.pages?.length - 1) || 0
  const isLastBook = currentBookIndex === books.length - 1
  
  const handleNextPage = () => {
    if (currentPageIndex < currentBook.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
      window.scrollTo(0, 0)
    } else if (currentBookIndex < books.length - 1) {
      // Move to next book
      if (!completedBooks.includes(currentBookIndex)) {
        setCompletedBooks([...completedBooks, currentBookIndex])
      }
      setCurrentBookIndex(currentBookIndex + 1)
      setCurrentPageIndex(0)
      window.scrollTo(0, 0)
    }
  }
  
  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
      window.scrollTo(0, 0)
    } else if (currentBookIndex > 0) {
      // Move to previous book, last page
      setCurrentBookIndex(currentBookIndex - 1)
      const prevBook = books[currentBookIndex - 1]
      setCurrentPageIndex(prevBook.pages.length - 1)
      window.scrollTo(0, 0)
    }
  }
  
  const handleComplete = () => {
    if (!completedBooks.includes(currentBookIndex)) {
      setCompletedBooks([...completedBooks, currentBookIndex])
    }
  }
  
  const handleBookSelect = (index) => {
    setCurrentBookIndex(index)
    setCurrentPageIndex(0)
    window.scrollTo(0, 0)
  }
  
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 dark:text-neutral-400">
          {t('moduleContent.noContent')}
        </p>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Book content */}
        <div className="md:w-3/4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm mb-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
                {currentBook.title}
              </h3>
              <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                <span>{t('moduleContent.outOf', { index: currentPageIndex + 1, total: currentBook.pages.length })}</span>
              </div>
            </div>
            
            {/* Page content */}
            <div className="prose max-w-none dark:prose-invert mb-6 min-h-[60vh]">
              <div dangerouslySetInnerHTML={{ __html: currentBook.pages[currentPageIndex].content }} />
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePreviousPage}
                disabled={currentBookIndex === 0 && currentPageIndex === 0}
                className={`btn-outline flex items-center ${
                  currentBookIndex === 0 && currentPageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiChevronLeft className="mr-1" />
                {t('moduleContent.previous')}
              </button>
              
              {isLastBook && isLastPage ? (
                <button
                  onClick={handleComplete}
                  className={`btn-primary flex items-center ${
                    completedBooks.includes(currentBookIndex) 
                      ? 'bg-success-500 hover:bg-success-500' 
                      : ''
                  }`}
                >
                  {completedBooks.includes(currentBookIndex) ? (
                    <>
                      <FiCheckCircle className="mr-1" />
                      {t('moduleContent.complete')}
                    </>
                  ) : (
                    t('moduleContent.markAsComplete')
                  )}
                </button>
              ) : (
                <button onClick={handleNextPage} className="btn-primary flex items-center">
                  {t('moduleContent.next')}
                  <FiChevronRight className="ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Book list */}
        <div className="md:w-1/4">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 sticky top-20">
            <h4 className="font-medium mb-3">
              {t('moduleContent.books')} ({currentBookIndex + 1}/{books.length})
            </h4>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {books.map((book, index) => (
                <div
                  key={index}
                  onClick={() => handleBookSelect(index)}
                  className={`flex flex-col p-3 rounded-md cursor-pointer ${
                    currentBookIndex === index
                      ? 'bg-primary-100 dark:bg-primary-900'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <div className="mb-2">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                  <h5 className="font-medium text-sm mb-1">
                    {book.title}
                  </h5>
                  <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{book.pages.length} pages</span>
                    {completedBooks.includes(index) && (
                      <span className="ml-2 flex items-center text-success-500">
                        <FiCheckCircle className="mr-1" />
                        {t('moduleContent.complete')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookContent