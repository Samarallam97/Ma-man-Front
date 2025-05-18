import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight} from 'react-icons/fi'

function CategoryCard({ category }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Link to={`/modules`}>
    <div className="bg-[var(--card-background)] shadow-md rounded-lg overflow-hidden transform transition duration-300 ease-in-out hover:shadow-xl">
      {/* Image */}
      <div className="relative group">
        <img
          src={category.imageUrl}
          alt="Card Image"
          className="w-full h-64 object-cover"
        />

       
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <div className="flex items-center justify-center h-full">
            <button className="flex items-center gap-2 text-white text-lg font-semibold px-6 py-3  rounded-md shadow-lg hover:bg-[var(--primary-dark)] transition-all duration-300 ease-in-out">
            Explore <FiArrowRight className="group-hover:animate-shake" />
            </button>
        </div>
        </div>


      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white truncate">{category.title}</h3>
        <p>{category.description}</p>
     </div>
      
      </div>
    </div>
    </Link>
  )
}

export default CategoryCard