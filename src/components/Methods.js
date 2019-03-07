import React from 'react'
import { NavLink } from 'react-router-dom'

const Methods = (props) =>
    <div className="navbar-dropdown methods">
        <NavLink className='navbar-item is-dark' exact to='/sectors'>All sectors</NavLink>
        <NavLink className='navbar-item' exact to='/single'>Single sector</NavLink>
        <NavLink className='navbar-item' exact to='/history'>Sector history</NavLink>
        <NavLink className='navbar-item' exact to='/grid'>Sectors within coordinates</NavLink>
        <NavLink className='navbar-item' exact to='/distance'>Sectors within distance</NavLink>
    </div>

export default Methods