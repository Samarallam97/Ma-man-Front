export async function fetchCategories() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return [
    {
      id: '1',
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming with JavaScript. This module covers variables, data types, conditionals, loops, and functions.',
      imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      title: 'Web Development Fundamentals',
      description: 'Master HTML, CSS, and JavaScript to build interactive web applications. Learn responsive design principles and modern CSS techniques.',
      imageUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      title: 'Data Science Essentials',
      description: 'Explore data analysis, visualization, and machine learning techniques. Learn to extract insights from complex datasets.',
      imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '4',
      title: 'Mobile App Development',
      description: 'Build native mobile applications for iOS and Android using React Native. Learn to create cross-platform apps efficiently.',
      imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '5',
      title: 'Cloud Computing Basics',
      description: 'Introduction to cloud services, deployment models, and infrastructure as code. Learn AWS, Azure, and Google Cloud fundamentals.',
      imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '6',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn to protect systems and networks from digital attacks. Covers encryption, secure coding, and threat detection.',
      imageUrl: 'https://images.pexels.com/photos/211151/pexels-photo-211151.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '7',
      title: 'Artificial Intelligence Foundations',
      description: 'Explore AI concepts including machine learning, neural networks, and natural language processing. Build intelligent systems.',
      imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '8',
      title: 'DevOps Practices',
      description: 'Learn continuous integration, delivery, and deployment. Master tools like Docker, Kubernetes, and Jenkins.',
      imageUrl: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '9',
      title: 'Blockchain Technology',
      description: 'Understanding blockchain architecture and applications. Learn about smart contracts and decentralized applications.',
      imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '10',
      title: 'UI/UX Design Principles',
      description: 'Master user interface and experience design. Learn design thinking, wireframing, prototyping, and usability testing.',
      imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    }
  ]
}

export async function fetchCategoryById(id) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const modules = await fetchModules()
  const module = modules.find(m => m.id === id)
  
  if (!module) {
    throw new Error('Module not found')
  }
  
  // Add content details based on module ID
    return {
      ...category,
      modules: 
      [
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
        }]
    }
  }   