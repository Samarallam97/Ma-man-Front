import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiClock, FiUser ,FiArrowRight} from 'react-icons/fi'

function ModuleCard({ module }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Link to={`/modules/${module.id}`}>
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 ease-in-out hover:shadow-xl">
      {/* Image */}
      <div className="relative group">
        <img
          src={module.imageUrl}
          alt="Card Image"
          className="w-full h-64 object-cover"
        />

        {/* Overlay on hover */}
<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
  <div className="flex items-center justify-center h-full">
    <button className="flex items-center gap-2 text-white text-lg font-semibold px-6 py-3 bg-[var(--primary-color)] rounded-md shadow-lg hover:bg-[var(--primary-dark)] transition-all duration-300 ease-in-out">
      Start Learning <FiArrowRight className="group-hover:animate-shake" />
    </button>
  </div>
</div>



        {/* Category Badge */}
        <div className="absolute top-2 right-2 bg-[var(--primary-color)] text-white text-xs px-2 py-1 rounded-md">
         {module.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white truncate">{module.title}</h3>

        {/* Meta Info */}
        <div className="flex items-center space-x-4 mb-2">
          <span className="flex items-center text-sm text-gray-500">
            <FiClock className="mr-1" />
            <span>12 hours</span>
          </span>
        </div>

        {/* Rating */}
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
      </div>
    </div>
    </Link>
  )
}

export default ModuleCard