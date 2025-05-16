// Mock API service for comments

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9)

// Get current user info (in a real app, this would come from auth service)
const getCurrentUser = () => ({
  id: 'current-user',
  name: 'Current User',
  avatar: null
})

// Mock comments data
let commentsData = [
  {
    id: 'c1',
    moduleId: '1',
    content: 'This module was incredibly helpful for a beginner like me. The explanations were clear and the examples were practical.',
    createdAt: '2025-04-02T10:23:45.000Z',
    edited: false,
    user: {
      id: 'user1',
      name: 'Sarah Miller',
      avatar: null,
      isCurrentUser: false
    },
    replies: [
      {
        id: 'r1',
        content: 'I agree! I especially liked the section on variables and data types.',
        createdAt: '2025-04-02T11:12:33.000Z',
        edited: false,
        user: {
          id: 'user2',
          name: 'James Wilson',
          avatar: null,
          isCurrentUser: false
        }
      },
      {
        id: 'r2',
        content: 'The programming exercises were challenging but rewarding.',
        createdAt: '2025-04-02T14:45:12.000Z',
        edited: true,
        user: {
          id: 'current-user',
          name: 'Current User',
          avatar: null,
          isCurrentUser: true
        }
      }
    ]
  },
  {
    id: 'c2',
    moduleId: '1',
    content: 'I found the pace of the videos to be perfect. Not too fast, not too slow. Great job explaining complex concepts in simple terms!',
    createdAt: '2025-04-01T15:30:22.000Z',
    edited: false,
    user: {
      id: 'user3',
      name: 'Alex Johnson',
      avatar: null,
      isCurrentUser: false
    },
    replies: []
  }
]

// For other modules, generate some sample comments
for (let i = 2; i <= 10; i++) {
  commentsData.push({
    id: `c${commentsData.length + 1}`,
    moduleId: i.toString(),
    content: 'This module covers a lot of valuable information. The instructor explains the concepts well.',
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
    edited: false,
    user: {
      id: `user${Math.floor(Math.random() * 10) + 4}`,
      name: `User ${Math.floor(Math.random() * 100) + 1}`,
      avatar: null,
      isCurrentUser: false
    },
    replies: []
  })
}

export async function fetchComments(moduleId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return commentsData.filter(comment => comment.moduleId === moduleId)
}

export async function addComment(moduleId, content) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const currentUser = getCurrentUser()
  
  const newComment = {
    id: generateId(),
    moduleId,
    content,
    createdAt: new Date().toISOString(),
    edited: false,
    user: {
      ...currentUser,
      isCurrentUser: true
    },
    replies: []
  }
  
  commentsData.push(newComment)
  
  return newComment
}

export async function addReply(commentId, content) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const currentUser = getCurrentUser()
  
  const newReply = {
    id: generateId(),
    content,
    createdAt: new Date().toISOString(),
    edited: false,
    user: {
      ...currentUser,
      isCurrentUser: true
    }
  }
  
  const comment = commentsData.find(c => c.id === commentId)
  if (comment) {
    comment.replies.push(newReply)
  }
  
  return newReply
}

export async function editComment(commentId, content) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const comment = commentsData.find(c => c.id === commentId)
  if (comment) {
    comment.content = content
    comment.edited = true
  }
  
  return comment
}

export async function deleteComment(commentId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const index = commentsData.findIndex(c => c.id === commentId)
  if (index !== -1) {
    commentsData.splice(index, 1)
  }
  
  return { success: true }
}