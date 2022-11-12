import React from 'react'
import useAuth from './useAuth'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './styles.css';
import OverlayBar from './OverlayBar';

export default function Dashboard({ code }) {
    //const accessToken = useAuth(code)
    return (<div className='background'>
        <OverlayBar/>
        
    </div>)
}