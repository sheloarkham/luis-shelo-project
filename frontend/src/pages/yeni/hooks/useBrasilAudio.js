import { useState, useEffect, useRef, useCallback } from 'react'
import {
  BRASIL_AUDIO_VOLUME,
  BRASIL_AUDIO_START,
  setBrasilAudioStart,
} from '../yeniData'

export function useBrasilAudio(yeniContentVisible) {
  const brasilSectionRef = useRef(null)
  const audioRef = useRef(null)
  const audioUnlockedRef = useRef(false)
  const brasilInViewRef = useRef(false)
  const audioMutedRef = useRef(false)

  const [brasilInView, setBrasilInView] = useState(false)
  const [audioMuted, setAudioMuted] = useState(false)
  const [audioBlocked, setAudioBlocked] = useState(false)
  const [audioLoadError, setAudioLoadError] = useState(false)

  brasilInViewRef.current = brasilInView
  audioMutedRef.current = audioMuted

  const playBrasilAudio = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || audioMutedRef.current || !brasilInViewRef.current) return false

    audio.volume = BRASIL_AUDIO_VOLUME
    if (audio.currentTime < BRASIL_AUDIO_START) {
      setBrasilAudioStart(audio)
    }
    try {
      await audio.play()
      setAudioBlocked(false)
      return true
    } catch {
      setAudioBlocked(true)
      return false
    }
  }, [])

  const unlockBrasilAudio = useCallback(async () => {
    if (audioUnlockedRef.current) return true

    const audio = audioRef.current
    if (!audio) return false

    audio.volume = BRASIL_AUDIO_VOLUME
    setBrasilAudioStart(audio)
    try {
      await audio.play()
      audio.pause()
      setBrasilAudioStart(audio)
      audioUnlockedRef.current = true
      setAudioBlocked(false)
      return true
    } catch {
      setAudioBlocked(true)
      return false
    }
  }, [])

  const handleBrasilAudioEnded = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !brasilInViewRef.current || audioMutedRef.current) return

    setBrasilAudioStart(audio)
    audio.play().catch(() => setAudioBlocked(true))
  }, [])

  useEffect(() => {
    const handleInteract = async () => {
      const unlocked = await unlockBrasilAudio()
      if (unlocked && brasilInViewRef.current && !audioMutedRef.current) {
        await playBrasilAudio()
      }
    }

    window.addEventListener('pointerdown', handleInteract, { passive: true })
    window.addEventListener('keydown', handleInteract)
    window.addEventListener('wheel', handleInteract, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', handleInteract)
      window.removeEventListener('keydown', handleInteract)
      window.removeEventListener('wheel', handleInteract)
    }
  }, [unlockBrasilAudio, playBrasilAudio])

  useEffect(() => {
    if (!yeniContentVisible) return

    const section = brasilSectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setBrasilInView(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [yeniContentVisible])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (brasilInView && !audioMuted) {
      if (audioUnlockedRef.current) {
        playBrasilAudio()
      } else {
        setAudioBlocked(true)
      }
    } else {
      audio.pause()
      if (!brasilInView) setBrasilAudioStart(audio)
    }
  }, [brasilInView, audioMuted, playBrasilAudio])

  useEffect(() => () => audioRef.current?.pause(), [])

  const handlePlayBrasilClick = async () => {
    await unlockBrasilAudio()
    await playBrasilAudio()
  }

  const toggleBrasilMute = () => {
    setAudioMuted((prev) => {
      const next = !prev
      audioMutedRef.current = next
      const audio = audioRef.current
      if (audio) {
        audio.muted = next
        if (!next && brasilInViewRef.current) playBrasilAudio()
      }
      return next
    })
  }

  return {
    audioRef,
    brasilSectionRef,
    brasilInView,
    audioMuted,
    audioBlocked,
    audioLoadError,
    setAudioLoadError,
    handlePlayBrasilClick,
    toggleBrasilMute,
    handleBrasilAudioEnded,
  }
}
