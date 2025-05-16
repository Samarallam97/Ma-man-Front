import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSend, FiCornerDownRight, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { fetchComments, addComment } from '../../services/commentService'

function ModuleComments({ moduleId }) {
  const { t } = useTranslation()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true)
        const data = await fetchComments(moduleId)
        setComments(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching comments:', error)
        setLoading(false)
      }
    }
    
    getComments()
  }, [moduleId])
  
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    try {
      setLoading(true)
      const comment = await addComment(moduleId, newComment.trim())
      setComments([...comments, comment])
      setNewComment('')
      setLoading(false)
    } catch (error) {
      console.error('Error adding comment:', error)
      setLoading(false)
    }
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="relative">
          <textarea
            className="input w-full h-20 resize-none pr-12"
            placeholder={t('comments.placeholder')}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={loading}
          ></textarea>
          <button
            type="submit"
            disabled={!newComment.trim() || loading}
            className={`absolute right-2 bottom-2 p-2 rounded-full bg-primary-500 text-white ${
              !newComment.trim() || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-600'
            }`}
          >
            <FiSend />
          </button>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-4 last:border-0">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0">
                  {comment.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-neutral-800 dark:text-white">
                        {comment.user.name}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(comment.createdAt)}
                        {comment.edited && (
                          <span className="ml-2 italic">({t('comments.edited')})</span>
                        )}
                      </p>
                    </div>
                    {comment.user.isCurrentUser && (
                      <div className="flex space-x-2">
                        <button className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400">
                          <FiEdit2 size={16} />
                        </button>
                        <button className="text-neutral-500 dark:text-neutral-400 hover:text-error-500">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                    {comment.content}
                  </p>
                  
                  {/* Reply button */}
                  <button className="mt-2 flex items-center text-sm text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300">
                    <FiCornerDownRight className="mr-1" size={14} />
                    {t('comments.reply')}
                  </button>
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="pt-3">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0">
                              {reply.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium text-neutral-800 dark:text-white">
                                    {reply.user.name}
                                  </h5>
                                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {formatDate(reply.createdAt)}
                                    {reply.edited && (
                                      <span className="ml-2 italic">({t('comments.edited')})</span>
                                    )}
                                  </p>
                                </div>
                                {reply.user.isCurrentUser && (
                                  <div className="flex space-x-2">
                                    <button className="text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400">
                                      <FiEdit2 size={14} />
                                    </button>
                                    <button className="text-neutral-500 dark:text-neutral-400 hover:text-error-500">
                                      <FiTrash2 size={14} />
                                    </button>
                                  </div>
                                )}
                              </div>
                              <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-500 dark:text-neutral-400">
              {t('comments.empty')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModuleComments