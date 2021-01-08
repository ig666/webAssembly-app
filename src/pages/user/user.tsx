import React, { FC, useEffect, useRef } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import lottie from 'lottie-web'
import animationJsonData from '../../animationJson/43792-yoga-se-hi-hoga.json'

const User: FC<RouteChildrenProps> = (props) => {
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
        <div ref={node} style={{ height: '500px' }}></div>
    )
}

export default User