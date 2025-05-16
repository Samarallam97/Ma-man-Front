import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiCheckCircle,
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiVolume2,
  FiVolumeX
} from 'react-icons/fi'

function AudioContent({ audio }) {
  const { t } = useTranslation()
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [completed, setCompleted] = useState([])
  
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  
  const currentAudio = audio[currentAudioIndex]
  const isLastAudio = currentAudioIndex === audio.length - 1
  
  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }
  
  // Handle audio navigation
  const handleNext = () => {
    if (currentAudioIndex < audio.length - 1) {
      // Mark current audio as completed when moving to next
      if (!completed.includes(currentAudioIndex)) {
        setCompleted([...completed, currentAudioIndex])
      }
      setCurrentAudioIndex(currentAudioIndex + 1)
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }
  
  const handlePrevious = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(currentAudioIndex - 1)
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }
  
  const handleComplete = () => {
    if (!completed.includes(currentAudioIndex)) {
      setCompleted([...completed, currentAudioIndex])
    }
  }
  
  // Handle audio selection from list
  const handleAudioSelect = (index) => {
    setCurrentAudioIndex(index)
    setCurrentTime(0)
    setIsPlaying(false)
  }
  
  // Handle time update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }
  
  // Handle seeking
  const handleSeek = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = pos * duration
    setCurrentTime(pos * duration)
  }
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    audioRef.current.volume = newVolume
    if (newVolume === 0) {
      setMuted(true)
    } else {
      setMuted(false)
    }
  }
  
  // Handle mute toggle
  const toggleMute = () => {
    setMuted(!muted)
    audioRef.current.muted = !muted
  }
  
  // Format time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }
  
  // Update duration when audio loads
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }
  
  // Handle audio end
  const handleAudioEnd = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    
    // Auto-play next if not last audio
    if (currentAudioIndex < audio.length - 1) {
      if (!completed.includes(currentAudioIndex)) {
        setCompleted([...completed, currentAudioIndex])
      }
      setCurrentAudioIndex(currentAudioIndex + 1)
      setTimeout(() => {
        audioRef.current.play()
        setIsPlaying(true)
      }, 500)
    } else {
      // Mark as completed if last audio
      if (!completed.includes(currentAudioIndex)) {
        setCompleted([...completed, currentAudioIndex])
      }
    }
  }
  
  // Update audio element when changing tracks
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentAudioIndex])
  
  if (!audio || audio.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 dark:text-neutral-400">
          {t('moduleContent.noContent')}
        </p>
      </div>
    )
  }
  
  return (
    <div>
      <div className="mb-8">
        {/* Audio player */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
              {currentAudio.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {currentAudio.description}
            </p>
          </div>
          
          {/* Audio element (hidden) */}
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleAudioEnd}
          >
            <source src={currentAudio.audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          
          {/* Progress bar */}
          <div className="mb-4">
            <div 
              ref={progressRef}
              className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button 
                onClick={toggleMute} 
                className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 p-2"
              >
                {muted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 mx-2"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handlePrevious}
                disabled={currentAudioIndex === 0}
                className={`text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 p-2 ${
                  currentAudioIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiSkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlay}
                className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-3"
              >
                {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} className="ml-1" />}
              </button>
              
              <button 
                onClick={handleNext}
                disabled={currentAudioIndex === audio.length - 1}
                className={`text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 p-2 ${
                  currentAudioIndex === audio.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiSkipForward size={20} />
              </button>
            </div>
            
            <div className="w-32"></div> {/* Placeholder for balance */}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentAudioIndex === 0}
              className={`btn-outline flex items-center ${
                currentAudioIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FiChevronLeft className="mr-1" />
              {t('moduleContent.previous')}
            </button>
            
            {isLastAudio ? (
              <button
                onClick={handleComplete}
                className={`btn-primary flex items-center ${
                  completed.includes(currentAudioIndex) 
                    ? 'bg-success-500 hover:bg-success-500' 
                    : ''
                }`}
              >
                {completed.includes(currentAudioIndex) ? (
                  <>
                    <FiCheckCircle className="mr-1" />
                    {t('moduleContent.complete')}
                  </>
                ) : (
                  t('moduleContent.markAsComplete')
                )}
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary flex items-center">
                {t('moduleContent.next')}
                <FiChevronRight className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Audio playlist */}
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
        <h4 className="font-medium mb-3">
          {t('moduleContent.audio')} ({currentAudioIndex + 1}/{audio.length})
        </h4>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {audio.map((track, index) => (
            <div
              key={index}
              onClick={() => handleAudioSelect(index)}
              className={`flex items-center p-3 rounded-md cursor-pointer ${
                currentAudioIndex === index
                  ? 'bg-primary-100 dark:bg-primary-900'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-500 dark:bg-primary-600 rounded-full flex items-center justify-center mr-3 text-white">
                {currentAudioIndex === index && isPlaying ? (
                  <FiPause size={16} />
                ) : (
                  <FiPlay size={16} className="ml-1" />
                )}
              </div>
              <div className="flex-grow">
                <h5 className="font-medium text-sm mb-1">
                  {track.title}
                </h5>
                <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{track.duration}</span>
                  {completed.includes(index) && (
                    <span className="ml-2 flex items-center text-success-500">
                      <FiCheckCircle className="mr-1" />
                      {t('moduleContent.complete')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AudioContent