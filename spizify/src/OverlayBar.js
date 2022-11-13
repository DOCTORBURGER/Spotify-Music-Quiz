import Navbar from 'react-bootstrap/Navbar';
import './styles.css';

export default function OverlayBar() {
    
    return (
        <Navbar className='banner' expand="lg">
            <span className='span'>
                <div className='left green'>Spizify</div>
            </span>

        </Navbar>
    );
}