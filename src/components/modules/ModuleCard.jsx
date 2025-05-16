import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiClock, FiUser } from 'react-icons/fi'

function ModuleCard({ module }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Link to={`/modules/${module.id}`}>
      <div 
        className="card h-full overflow-hidden module-card relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img 
            src={module.imageUrl} 
            alt={module.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-md">
            {module.category}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white truncate">
            {module.title}
          </h3>
          
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            <FiClock className="mr-1" />
            <span>{module.duration}</span>
            <span className="mx-2">•</span>
            <FiUser className="mr-1" />
            <span>{module.author}</span>
          </div>
          
          <div className="flex items-center mt-3">
            <div className="flex text-accent-500">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  className={i < Math.floor(module.rating) ? "fill-current" : ""} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
              ({module.ratingCount})
            </span>
          </div>
          
          {/* Brief description on hover */}
          <div 
            className={`absolute inset-0 bg-primary-500/90 text-white p-6 flex flex-col justify-center module-description transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h3 className="text-xl font-bold mb-3">{module.title}</h3>
            <p className="text-white/90">{module.description}</p>
            <div className="mt-auto pt-4 text-sm font-medium">
              Click to explore this module
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ModuleCard