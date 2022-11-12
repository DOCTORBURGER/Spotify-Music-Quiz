import { useState, useEffect } from 'react'
import useAuth from './useAuth'
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
    console.log(searchResults)

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return 

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
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

        return () => cancel = true
    }, [search, accessToken])

    return <Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
        <Form.Control type="search" placeholder="Search Songs/ Artists" values={search} onChange={e => setSearch(e.target.value)}/>
        <div className='flex-grow-1 my-2' sytle={{overflowY: 'auto' }}>
            {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri} />
            ))}
        </div>
        <div>Bottom</div>
    </Container>
}