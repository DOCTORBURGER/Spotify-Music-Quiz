import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() { //might remove
        chooseTrack(track)
    }
    return (
        <div className="d-flex m-2 align-items-center" sytle={{cursor: "pointer" }} onClick={handlePlay}>
            <img src={track.albumUrl} style={{height: '64px', width: '64px'}} />
            <div className="ml-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    )
}