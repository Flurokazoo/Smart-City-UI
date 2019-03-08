import React from 'react'
import { NavLink } from 'react-router-dom'

const Card = ({ title, text, colorClass, route }) => {

    const articleClasses = "tile is-child notification has-text-centered is-bold " + colorClass
    const btnClasses = "button is-inverted is-medium " + colorClass

    return <div className="tile is-parent">
        <article className={articleClasses}>
            <p className="title">{title}</p>
            <p className="subtitle">{text}</p>
            <NavLink className={btnClasses} to={route}>Go here!</NavLink>
        </article>
    </div>

}





export default Card

