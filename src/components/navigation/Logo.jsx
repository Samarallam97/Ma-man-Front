function Logo({ className }) {
  return (
    <svg 
      className={className} 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M10 30C8.89543 30 8 29.1046 8 28V12C8 10.8954 8.89543 10 10 10H30C31.1046 10 32 10.8954 32 12V28C32 29.1046 31.1046 30 30 30H10Z" 
        fill="#0072ff" 
      />
      <path 
        d="M20 6L24 10H16L20 6Z" 
        fill="#0072ff" 
      />
      <circle 
        cx="20" 
        cy="20" 
        r="6" 
        fill="white" 
      />
      <path 
        d="M16 34H24L20 38L16 34Z" 
        fill="#0072ff" 
      />
      <path 
        d="M6 16V24L2 20L6 16Z" 
        fill="#0072ff" 
      />
      <path 
        d="M34 24V16L38 20L34 24Z" 
        fill="#0072ff" 
      />
    </svg>
  )
}

export default Logo