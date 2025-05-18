// Mock API service for modules

export async function fetchModules() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return [
    {
      id: '1',
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming with JavaScript. This module covers variables, data types, conditionals, loops, and functions.',
      imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Programming',
      duration: '8 hours',
      author: 'John Doe',
      rating: 4.7,
      ratingCount: 128
    },
    {
      id: '2',
      title: 'Web Development Fundamentals',
      description: 'Master HTML, CSS, and JavaScript to build interactive web applications. Learn responsive design principles and modern CSS techniques.',
      imageUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Web Development',
      duration: '12 hours',
      author: 'Sarah Johnson',
      rating: 4.5,
      ratingCount: 96
    },
    {
      id: '3',
      title: 'Data Science Essentials',
      description: 'Explore data analysis, visualization, and machine learning techniques. Learn to extract insights from complex datasets.',
      imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Data Science',
      duration: '15 hours',
      author: 'Michael Chen',
      rating: 4.8,
      ratingCount: 112
    },
    {
      id: '4',
      title: 'Mobile App Development',
      description: 'Build native mobile applications for iOS and Android using React Native. Learn to create cross-platform apps efficiently.',
      imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Mobile Development',
      duration: '10 hours',
      author: 'Emily Williams',
      rating: 4.6,
      ratingCount: 85
    },
    {
      id: '5',
      title: 'Cloud Computing Basics',
      description: 'Introduction to cloud services, deployment models, and infrastructure as code. Learn AWS, Azure, and Google Cloud fundamentals.',
      imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Cloud Computing',
      duration: '9 hours',
      author: 'David Brown',
      rating: 4.4,
      ratingCount: 73
    },
    {
      id: '6',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn to protect systems and networks from digital attacks. Covers encryption, secure coding, and threat detection.',
      imageUrl: 'https://images.pexels.com/photos/211151/pexels-photo-211151.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Cybersecurity',
      duration: '11 hours',
      author: 'Alex Martinez',
      rating: 4.9,
      ratingCount: 142
    },
    {
      id: '7',
      title: 'Artificial Intelligence Foundations',
      description: 'Explore AI concepts including machine learning, neural networks, and natural language processing. Build intelligent systems.',
      imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Artificial Intelligence',
      duration: '14 hours',
      author: 'Sophia Lee',
      rating: 4.7,
      ratingCount: 104
    },
    {
      id: '8',
      title: 'DevOps Practices',
      description: 'Learn continuous integration, delivery, and deployment. Master tools like Docker, Kubernetes, and Jenkins.',
      imageUrl: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'DevOps',
      duration: '13 hours',
      author: 'Robert Wilson',
      rating: 4.5,
      ratingCount: 89
    },
    {
      id: '9',
      title: 'Blockchain Technology',
      description: 'Understanding blockchain architecture and applications. Learn about smart contracts and decentralized applications.',
      imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Blockchain',
      duration: '9 hours',
      author: 'Natalie Garcia',
      rating: 4.3,
      ratingCount: 67
    },
    {
      id: '10',
      title: 'UI/UX Design Principles',
      description: 'Master user interface and experience design. Learn design thinking, wireframing, prototyping, and usability testing.',
      imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Design',
      duration: '10 hours',
      author: 'Olivia Taylor',
      rating: 4.8,
      ratingCount: 118
    }
  ]
}

export async function fetchModuleById(id) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const modules = await fetchModules()
  const module = modules.find(m => m.id === id)
  
  if (!module) {
    throw new Error('Module not found')
  }
  
  // Add content details based on module ID
  if (id === '1') {
    return {
      ...module,
      videos: [
        {
          id: 'v1',
          title: 'Introduction to Programming Concepts',
          description: 'Learn the fundamental concepts of programming and how code works.',
          duration: '12:30',
          embedUrl: 'https://www.youtube.com/embed/zOjov-2OZ0E',
          thumbnailUrl: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 'v2',
          title: 'Variables and Data Types',
          description: 'Understanding variables, data types, and how to use them in JavaScript.',
          duration: '15:45',
          embedUrl: 'https://www.youtube.com/embed/edlFjlzxkSI',
          thumbnailUrl: 'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 'v3',
          title: 'Conditionals and Control Flow',
          description: 'Learn how to use if statements, else statements, and logical operators.',
          duration: '18:20',
          embedUrl: 'https://www.youtube.com/embed/N2PpRnFqnqY',
          thumbnailUrl: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 'v4',
          title: 'Loops and Iteration',
          description: 'Master different types of loops including for, while, and do-while loops.',
          duration: '14:10',
          embedUrl: 'https://www.youtube.com/embed/s9wW2PpJsmQ',
          thumbnailUrl: 'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ],
      books: [
        {
          id: 'b1',
          title: 'Programming for Beginners',
          coverUrl: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800',
          pages: [
            {
              id: 'p1',
              content: '<h1>Chapter 1: What is Programming?</h1><p>Programming is the process of creating a set of instructions that tell a computer how to perform a task. These instructions can be written in various programming languages, each with its own syntax and rules.</p><p>Programming involves several key principles:</p><ul><li>Algorithms: Step-by-step procedures for calculations or problem-solving</li><li>Data structures: Ways to organize and store data</li><li>Control flow: The order in which instructions are executed</li><li>Functions: Reusable blocks of code</li></ul><p>In this book, we\'ll explore these concepts using JavaScript, one of the most popular programming languages in the world.</p>'
            },
            {
              id: 'p2',
              content: '<h1>Chapter 2: Getting Started with JavaScript</h1><p>JavaScript was created in 1995 and has since become one of the core technologies of the web. It\'s a versatile language that can be used for front-end web development, back-end servers, mobile apps, and more.</p><p>To start writing JavaScript, you need:</p><ul><li>A text editor or integrated development environment (IDE)</li><li>A web browser (for client-side JavaScript)</li><li>Node.js (for server-side JavaScript)</li></ul><p>Let\'s write our first JavaScript program:</p><pre><code>// This is a comment\nconsole.log("Hello, world!");</code></pre><p>This program outputs the text "Hello, world!" to the console. The <code>console.log()</code> function is used to print messages for debugging purposes.</p>'
            },
            {
              id: 'p3',
              content: '<h1>Chapter 3: Variables and Data Types</h1><p>Variables are containers for storing data values. In JavaScript, you can declare variables using <code>var</code>, <code>let</code>, or <code>const</code>.</p><pre><code>// Using let (recommended for variables that can change)\nlet name = "John";\n\n// Using const (for variables that shouldn\'t change)\nconst age = 25;</code></pre><p>JavaScript has several data types:</p><ul><li><strong>String</strong>: Text, enclosed in quotes</li><li><strong>Number</strong>: Integers and floating-point numbers</li><li><strong>Boolean</strong>: true or false values</li><li><strong>Object</strong>: Collections of related data</li><li><strong>Array</strong>: Ordered lists</li><li><strong>Null</strong>: Represents intentional absence of value</li><li><strong>Undefined</strong>: Represents uninitialized variables</li></ul>'
            }
          ]
        }
      ],
      audio: [
        {
          id: 'a1',
          title: 'Programming Fundamentals Podcast',
          description: 'An audio overview of programming fundamentals for beginners.',
          duration: '23:45',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
          id: 'a2',
          title: 'JavaScript Explained',
          description: 'A deep dive into JavaScript and its unique features.',
          duration: '18:30',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        },
        {
          id: 'a3',
          title: 'Coding Best Practices',
          description: 'Learn about coding conventions and best practices for clean code.',
          duration: '15:20',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        }
      ]
    }
  } else {
    // Default content for other modules
    return {
      ...module,
      videos: [
        {
          id: 'v1',
          title: 'Introduction to the Module',
          description: 'An overview of what you\'ll learn in this module.',
          duration: '10:15',
          embedUrl: 'https://www.youtube.com/embed/zOjov-2OZ0E',
          thumbnailUrl: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 'v2',
          title: 'Core Concepts',
          description: 'Exploring the fundamental concepts of this subject.',
          duration: '14:30',
          embedUrl: 'https://www.youtube.com/embed/edlFjlzxkSI',
          thumbnailUrl: 'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ],
      books: [
        {
          id: 'b1',
          title: `${module.title} Handbook`,
          coverUrl: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800',
          pages: [
            {
              id: 'p1',
              content: `<h1>Chapter 1: Introduction to ${module.title}</h1><p>This chapter introduces you to the key concepts and principles of ${module.category}. We'll explore the fundamental ideas that form the foundation of this field.</p><p>The goals of this chapter are:</p><ul><li>Understand the history and evolution of ${module.category}</li><li>Identify key principles and methodologies</li><li>Recognize the importance of ${module.category} in today's world</li></ul>`
            },
            {
              id: 'p2',
              content: '<h1>Chapter 2: Getting Started</h1><p>In this chapter, we\'ll set up the necessary tools and environment for your learning journey. You\'ll get hands-on experience with the basic workflow and start building your first project.</p><p>By the end of this chapter, you\'ll be able to:</p><ul><li>Set up a professional development environment</li><li>Use the essential tools of the trade</li><li>Create your first simple project</li></ul>'
            }
          ]
        }
      ],
      audio: [
        {
          id: 'a1',
          title: `${module.title} Podcast`,
          description: `An audio overview of ${module.title} for beginners.`,
          duration: '20:15',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
          id: 'a2',
          title: 'Expert Interviews',
          description: 'Interviews with industry experts sharing their insights and experiences.',
          duration: '25:40',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        }
      ]
    }
  }
}

export async function rateModule(moduleId, rating) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  console.log(`Module ${moduleId} rated ${rating} stars`)
  
  // In a real app, this would update the rating in the database
  return { success: true, moduleId, rating }
}