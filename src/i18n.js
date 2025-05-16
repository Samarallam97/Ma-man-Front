import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navigation
          'home': 'Home',
          'rules': 'Rules',
          'vision': 'Vision',
          'goal': 'Goal',
          'login': 'Login',
          
          // Common
          'next': 'Next',
          'back': 'Back',
          'support_us': 'Support Us',
          'contact_us': 'Contact Us',
          'join_us': 'Join Us',
          
          // Welcome page
          'welcome_title': "Welcome to Ma'man",
          'welcome_description': "A safe educational platform for children to learn and grow",
          
          // Auth pages
          'email': 'Email',
          'password': 'Password',
          'confirm_password': 'Confirm Password',
          'name': 'Name',
          'national_id': 'National ID',
          'date_of_birth': 'Date of Birth',
          'role': 'Role',
          'select_role': 'Select Role',
          'adult': 'Adult (14-18)',
          'parent': 'Parent (18+)',
          'sign_in': 'Sign In',
          'signing_in': 'Signing In...',
          'register': 'Register',
          'registering': 'Registering...',
          'forgot_password': 'Forgot Password?',
          'reset_password_description': 'Enter your email address and we will send you instructions to reset your password.',
          'reset_password_success': 'Check your email for password reset instructions.',
          'send_reset_link': 'Send Reset Link',
          'sending': 'Sending...',
          'back_to_login': 'Back to Login',
          'already_have_account': 'Already have an account?',
          
          // Theme
          'dark_mode': 'Dark Mode',
          'light_mode': 'Light Mode',
          
          // Language
          'language': 'Language',
          'english': 'English',
          'arabic': 'Arabic'
        }
      },
      ar: {
        translation: {
          // Navigation
          'home': 'الرئيسية',
          'rules': 'القواعد',
          'vision': 'الرؤية',
          'goal': 'الهدف',
          'login': 'تسجيل الدخول',
          
          // Common
          'next': 'التالي',
          'back': 'السابق',
          'support_us': 'ادعمنا',
          'contact_us': 'تواصل معنا',
          'join_us': 'انضم إلينا',
          
          // Welcome page
          'welcome_title': 'مرحباً بكم في مأمن',
          'welcome_description': 'منصة تعليمية آمنة للأطفال للتعلم والنمو',
          
          // Auth pages
          'email': 'البريد الإلكتروني',
          'password': 'كلمة المرور',
          'confirm_password': 'تأكيد كلمة المرور',
          'name': 'الاسم',
          'national_id': 'رقم الهوية',
          'date_of_birth': 'تاريخ الميلاد',
          'role': 'الدور',
          'select_role': 'اختر الدور',
          'adult': 'بالغ (14-18)',
          'parent': 'ولي أمر (18+)',
          'sign_in': 'تسجيل الدخول',
          'signing_in': 'جاري تسجيل الدخول...',
          'register': 'تسجيل',
          'registering': 'جاري التسجيل...',
          'forgot_password': 'نسيت كلمة المرور؟',
          'reset_password_description': 'أدخل بريدك الإلكتروني وسنرسل لك تعليمات إعادة تعيين كلمة المرور.',
          'reset_password_success': 'تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور.',
          'send_reset_link': 'إرسال رابط إعادة التعيين',
          'sending': 'جاري الإرسال...',
          'back_to_login': 'العودة لتسجيل الدخول',
          'already_have_account': 'لديك حساب بالفعل؟',
          
          // Theme
          'dark_mode': 'الوضع الداكن',
          'light_mode': 'الوضع الفاتح',
          
          // Language
          'language': 'اللغة',
          'english': 'الإنجليزية',
          'arabic': 'العربية'
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;