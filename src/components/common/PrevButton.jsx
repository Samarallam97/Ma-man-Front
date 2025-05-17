import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { LuArrowLeft } from "react-icons/lu";

const Button = styled(motion.button)`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);
  box-shadow: 0 4px 10px var(--shadow-color);
  transition: background-color var(--transition-fast) ease;
  position: absolute;
  left: 20px;
  bottom: 20px;
  &:hover {
    background-color: var(--primary-light);
  }
  
  svg {
    transition: transform var(--transition-fast) ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
  
  [dir="rtl"] &:hover svg {
    transform: translateX(-4px);
  }
`

function PrevButton({ to }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const handleClick = () => {
    navigate(to)
  }
  
  return (
    <Button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
<LuArrowLeft size={20} />
      {t('prev')}
      
    </Button>
  )
}

export default PrevButton