import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({accessToken, trackUri}) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null
    return <div className = "SpotifyPlayer"> <SpotifyPlayer
        token={accessToken}
        callback={state => {
            if(!state.isPlaying) setPlay(false)
        }}
        play = {play}
        uris={trackUri ? [trackUri] : []}
        
    />
    </div>
}