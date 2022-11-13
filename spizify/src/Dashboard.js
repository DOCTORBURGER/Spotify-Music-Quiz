import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import Player from './Player'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'


const spotifyApi = new SpotifyWebApi({
    clientId: '7be5175ad2c840fd802af2ec7a0d0b92'
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }
    function getUserData() {
        //console.log(SpotifyWebApi)
        
        spotifyApi.getMe().then(data=> {
            //console.log("name: " + data.body.display_name)//spotifyApi.getUserPlaylists(data.)
            console.log(data)
            spotifyApi.getUserPlaylists(data.body.display_name).then(function(data2) {
                console.log(data2)
            }).catch(err => {
                console.log("ERROR! " + err)
            })
            /*
            fetch(`https://api.spotify.com/v1/users/${data.body.display_name}/playlists`, {method:'GET', headers : ({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
                'Host': 'api.spotify.com'
            })}).then(data2 => {
                console.log(data2)
            })*/
            /*
            spotifyApi.getUserPlaylists(data.body.display_name).then(function(data2)  {
                console.log(data2)
            })*/
        })
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

    return <div><button onClick={getUserData}>request</button><Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
        <Form.Control type="search" placeholder="Search Songs/ Artists" values={search} onChange={e => setSearch(e.target.value)}/>
        <div className='flex-grow-1 my-2' sytle={{overflowY: 'auto' }}>
            {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
            ))}
        </div>
        <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
    </Container></div>
}