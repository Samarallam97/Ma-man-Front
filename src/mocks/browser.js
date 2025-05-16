import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

// Mock data imports
import { fetchModules, fetchModuleById, rateModule } from '../services/moduleService'
import { fetchComments, addComment, addReply, editComment, deleteComment } from '../services/commentService'

// Define handlers
const handlers = [
  // Modules API
  http.get('/api/modules', async () => {
    const modules = await fetchModules()
    return HttpResponse.json(modules)
  }),
  
  http.get('/api/modules/:id', async ({ params }) => {
    try {
      const module = await fetchModuleById(params.id)
      return HttpResponse.json(module)
    } catch (error) {
      return new HttpResponse(null, { status: 404 })
    }
  }),
  
  http.post('/api/modules/:id/rate', async ({ params, request }) => {
    const body = await request.json()
    const result = await rateModule(params.id, body.rating)
    return HttpResponse.json(result)
  }),
  
  // Comments API
  http.get('/api/modules/:moduleId/comments', async ({ params }) => {
    const comments = await fetchComments(params.moduleId)
    return HttpResponse.json(comments)
  }),
  
  http.post('/api/modules/:moduleId/comments', async ({ params, request }) => {
    const body = await request.json()
    const comment = await addComment(params.moduleId, body.content)
    return HttpResponse.json(comment)
  }),
  
  http.post('/api/comments/:commentId/replies', async ({ params, request }) => {
    const body = await request.json()
    const reply = await addReply(params.commentId, body.content)
    return HttpResponse.json(reply)
  }),
  
  http.put('/api/comments/:commentId', async ({ params, request }) => {
    const body = await request.json()
    const comment = await editComment(params.commentId, body.content)
    return HttpResponse.json(comment)
  }),
  
  http.delete('/api/comments/:commentId', async ({ params }) => {
    const result = await deleteComment(params.commentId)
    return HttpResponse.json(result)
  })
]

// Setup MSW
export function setupMocks() {
  if (typeof window === 'undefined') {
    return
  }
  
  const worker = setupWorker(...handlers)
  worker.start({
    onUnhandledRequest: 'bypass'
  })
  
  console.log('Mock Service Worker initialized')
}