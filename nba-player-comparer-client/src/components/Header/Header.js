import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <header className='header'>
        NBA Player Comparer
        <br />
        <Link style={linkStyle} to='/'>Show All Players | </Link>
        <Link style={linkStyle} to='/comparePlayers'>Compare Players</Link>
    </header>

)

const linkStyle = {
    color: '#ffffff',
    fontSize: '16px',
    textDecoration: 'none'
}

export default Header