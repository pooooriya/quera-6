import React, { useState } from 'react'
import './style.scss'
import { Outlet } from 'react-router-dom'
//import PrivateComponents from '../HOC'
import { Container } from './style'
const Layout = () => {
    const [isActive, setisActive] = useState(true)
    return (
        <Container isActive={isActive}>
            <Outlet />
        </Container>
    )
}

export default Layout