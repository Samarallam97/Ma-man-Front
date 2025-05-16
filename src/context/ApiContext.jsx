import { createContext, useContext } from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Create a mock instance
const mock = new MockAdapter(axios, { delayResponse: 1000 })

// Mock endpoints
mock.onGet('/api/content').reply(200, {
  welcome: {
    en: {
      title: "Welcome to Ma'man",
      description: 'A trusted place for young minds to explore, learn, and thrive',//"A safe educational platform for children to learn and grow",
      ctaText: "Get Started"
    },
    ar: {
      title: "مرحباً بكم في مأمن",
      description: 'مكان موثوق للعقول الناشئة للاستكشاف والتعلم والازدهار',//"منصة تعليمية آمنة للأطفال للتعلم والنمو",
      ctaText: "هيا بنا نبدأ"
    }
  },
  rules: {
    en: {
      title: "Platform Rules",
      description: "Guidelines to ensure a safe and productive learning environment",
      points: [
        "Be respectful to others",
        "Focus on learning",
        "Ask questions when unsure",
        "Share knowledge with peers",
        "Take breaks when needed",
        "Take breaks when needed",
        "Take breaks when needed",
        "Take breaks when needed"
      ]
    },
    ar: {
      title: "قواعد المنصة",
      description: "إرشادات لضمان بيئة تعليمية آمنة ومنتجة",
      points: [
        "احترم الآخرين",
        "ركز على التعلم",
        "اسأل عندما لا تكون متأكداً",
        "شارك المعرفة مع الأقران",
        "خذ فترات راحة عند الحاجة",
        "خذ فترات راحة عند الحاجة",
         "خذ فترات راحة عند الحاجة",
        "خذ فترات راحة عند الحاجة",
      ]
    }
  },
  vision: {
    en: {
      title: "Our Vision",
      description: "Creating a world where every child has access to quality education",
      points: [
        "Accessible education for all",
        "Personalized learning experiences",
        "Building critical thinking skills",
        "Supporting lifelong learning habits"
      ]
    },
    ar: {
      title: "رؤيتنا",
      description: "خلق عالم يتمتع فيه كل طفل بإمكانية الوصول إلى تعليم عالي الجودة",
      points: [
        "تعليم متاح للجميع",
        "تجارب تعليمية مخصصة",
        "بناء مهارات التفكير النقدي",
        "دعم عادات التعلم مدى الحياة"
      ]
    }
  },
  goal: {
    en: {
      title: "Our Goals",
      description: "Empowering the next generation through education and technology",
      points: [
        "Reach 1 million children by 2028",
        "Develop comprehensive curriculum for ages 5-15",
        "Continuous improvement through feedback",
        "Create engaging and effective learning materials",
        "Continuous improvement through feedback",
        "Create engaging and effective learning materials"
      ]
    },
    ar: {
      title: "أهدافنا",
      description: "تمكين الجيل القادم من خلال التعليم والتكنولوجيا",
      points: [
        "الوصول إلى مليون طفل بحلول عام 2028",
        "تطوير منهج شامل للأعمار من 5 إلى 15 عاماً",
        "التحسين المستمر من خلال التغذية الراجعة",
        "إنشاء مواد تعليمية جذابة وفعالة",
        "إنشاء مواد تعليمية جذابة وفعالة",
        "إنشاء مواد تعليمية جذابة وفعالة"
      ]
    }
  }
})

mock.onPost('/api/login').reply(config => {
  const { email, password } = JSON.parse(config.data)
  
  if (email === 'demo@example.com' && password === 'password') {
    return [200, { 
      user: { id: 1, name: 'Demo User', email: 'demo@example.com' },
      token: 'fake-jwt-token'
    }]
  }
  
  return [401, { message: 'Invalid credentials' }]
})

const ApiContext = createContext()

export function ApiProvider({ children }) {
  const api = {
    getContent: async () => {
      const response = await axios.get('/api/content')
      return response.data
    },
    login: async (email, password) => {
      const response = await axios.post('/api/login', { email, password })
      return response.data
    }
  }

  return (
    <ApiContext.Provider value={{ api }}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}