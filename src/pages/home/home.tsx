import React, { FC, useEffect, useRef } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import lottie from 'lottie-web'
import animationJsonData from '../../animationJson/45056-contact-us.json'

const Home: FC<RouteChildrenProps> = (props) => {
  const node = useRef<HTMLDivElement>(null)
  useEffect(() => {
      const lot = lottie.loadAnimation({
          container: node.current!,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationJsonData
      })
      lot.play()
      return () => { lot.stop() }
  }, [])
    return (
      <div ref={node} style={{ height: '70vh' }}></div>
    )
}

export default Home