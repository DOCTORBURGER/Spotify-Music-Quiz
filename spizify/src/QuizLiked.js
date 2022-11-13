import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import Player from './Player'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'


const spotifyApi = new SpotifyWebApi({
    clientId: '7be5175ad2c840fd802af2ec7a0d0b92'
})

export default function QuizLiked({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [savedTracks, setSavedTracks] = useState([])

    function guessTrack(track) {
        if (track.uri == playingTrack.uri) console.log('Track Guessed Correctly')
        setSearch('')
    }

    function randomTrack() {
        setPlayingTrack(savedTracks[Math.floor(Math.random() * 50)])
        console.log(savedTracks)
        setSearch('')
    }
    
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return 

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if(cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                if (cancel) return
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return () => (cancel = true)
    }, [search, accessToken])

    useEffect(() => {
        if(!accessToken) return

        spotifyApi.getMySavedTracks({
            limit: 50,
            offset: 0
          })
          .then(function(data) {
            setSavedTracks(data.body.items.map(item => {
                console.log(item.track.name)
                return {
                    title: item.track.name,
                    artist: item.track.artists[0].name,
                    uri: item.track.uri
                }
            }))
          }, function(err) {
            console.log('Something went wrong!', err);
          });
    }, [accessToken])

    return <div className='quizLiked'><div><Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
        <Form.Control className='searchBox' type="search" placeholder="Search Songs/ Artists" values={search} onChange={e => setSearch(e.target.value)}/>
        <div className='flex-grow-1 my-2' sytle={{overflowY: 'auto' }}>
            {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri} chooseTrack={guessTrack}/>
            ))}
        </div>
        <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
        <div><button className='randombutton' onClick={randomTrack}>Random Track</button></div>

    </Container></div> </div>
}