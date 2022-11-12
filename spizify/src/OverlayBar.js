import Navbar from 'react-bootstrap/Navbar';
import './styles.css';

export default function OverlayBar() {

    return (
        <Navbar bg="dark" expand="lg">
            <span className='span'>
                <div className='left green'>Spizify</div>
                <div className='right green'>Logged in as: </div>
            </span>

        </Navbar>
    );
}