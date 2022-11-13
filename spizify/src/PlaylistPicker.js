import './styles.css';
import OverlayBar from './OverlayBar';
import Card from 'react-bootstrap/Card';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import React from 'react';
import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';

const spotifyApi = new SpotifyWebApi({
    clientId: '7be5175ad2c840fd802af2ec7a0d0b92'
})
export default function PlaylistPicker({ code }) {

    const accessToken = useAuth(code)
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        getUserData()
    }, [accessToken])

    function getUserData() {

        spotifyApi.getMe().then(userData => {
            var uri = (userData.body.uri.split(":"))[2]
            spotifyApi.getUserPlaylists(uri).then(function (playlistData) {
                const locPlay = []
                playlistData.body.items.forEach((item) => {
                    locPlay.push(
                        <Card onClick="" className='playlistCard'>
                            <Card.Body>
                                <Card.Title className='white'>
                                    {item.name}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    )
                    console.log(item)
                })
                setPlaylists(locPlay)
            }).catch(err => {
                console.log("ERROR! " + err)
            })
        })
    }
    console.log('here farther')
    return (
        <body>
            <div  class="background">
                <OverlayBar />
                <div className='centerText'>Choose a playlist</div>
                <div className="cardRow">
                    {playlists}
                </div>
            </div>
        </body>
    )


}