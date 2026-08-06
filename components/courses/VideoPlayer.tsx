'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize,
  Minimize,
  SkipForward,
  SkipBack,
  Clock
} from 'lucide-react'

interface VideoPlayerProps {
  videoUrl: string
  title: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
  autoPlay?: boolean
}

export function VideoPlayer({ 
  videoUrl, 
  title, 
  onProgress, 
  onComplete,
  autoPlay = false 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const total = videoRef.current.duration
      const percent = (current / total) * 100
      
      setCurrentTime(current)
      setProgress(percent)
      
      if (onProgress) {
        onProgress(percent)
      }

      // Verificar se completou (95% ou mais)
      if (percent >= 95 && !isCompleted) {
        setIsCompleted(true)
        if (onComplete) {
          onComplete()
        }
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const seekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        videoRef.current.duration
      )
    }
  }

  const seekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      )
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = x * videoRef.current.duration
    }
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        playsInline
      />
      
      {/* Overlay de controle */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Barra de progresso */}
        <div 
          className="w-full h-1 bg-gray-600 rounded-full cursor-pointer mb-3"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-vigorre-gold rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={seekBackward}
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={seekForward}
            >
              <SkipForward className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Título do vídeo */}
      <div className="absolute top-4 left-4">
        <h3 className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded">
          {title}
        </h3>
      </div>

      {/* Indicador de conclusão */}
      {isCompleted && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Concluído
        </div>
      )}
    </div>
  )
}
