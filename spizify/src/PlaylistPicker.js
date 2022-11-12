import './styles.css';
import OverlayBar from './OverlayBar';
import Card from 'react-bootstrap/Card';

export default function PlaylistPicker() {
    return (
        <div>
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
        </div>
    )
}