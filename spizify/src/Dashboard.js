import React from 'react'
import useAuth from './useAuth'

export default function Dashboard({ code }) {
    //const accessToken = useAuth(code)
    return (<div>
        <nav className='Header py-2 text-black mb-4' style={{ backgroundColor: 'var(--accent-color)' }}>
            <div className='container text-center'>
                <h3 className='py-3 mx-2'>Todo App: React & Bootstrap</h3>
            </div>
        </nav>
    </div>)
}