import React from 'react'
import useAuth from './useAuth'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './styles.css';
import OverlayBar from './OverlayBar';
import Card from 'react-bootstrap/Card';

export default function Dashboard({ code }) {
    //const accessToken = useAuth(code)
    
    return (<div className='background'>
        <OverlayBar/>
        <div className='centerText'>Choose a playlist</div>
        <div className="cardRow">
            <Card className='playlistCard'>
                <Card.Body>
                    <Card.Title className='white'>
                        Playlist1
                    </Card.Title>
                </Card.Body>
            </Card>
            <Card className='playlistCard'>
                <Card.Body>
                    <Card.Title className='white'>
                        Playlist2
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
        
    </div>)
}