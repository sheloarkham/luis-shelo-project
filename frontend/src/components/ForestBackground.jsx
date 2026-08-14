import { useIsDesktop } from '../hooks/useIsDesktop'
import './ForestBackground.css'

const FOREST_VIDEO_CDN =
  'https://assets.mixkit.co/videos/preview/mixkit-sun-light-passing-through-the-trees-in-a-forest-11859-large.mp4'

const ForestBackground = () => {
  const isDesktop = useIsDesktop()

  if (!isDesktop) return null

  return (
    <div className="forest-background" aria-hidden="true">
      <video
        className="forest-background__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/forest-bg.mp4" type="video/mp4" />
        <source src={FOREST_VIDEO_CDN} type="video/mp4" />
      </video>
      <div className="forest-background__overlay" />
    </div>
  )
}

export default ForestBackground
