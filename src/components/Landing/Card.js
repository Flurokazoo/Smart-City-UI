import React from 'react'

const Card = ({ title, text, image, colorClass }) => {

    const articleClasses = "tile is-child notification has-text-centered is-bold " + colorClass
    const btnClasses = "button is-inverted is-medium " + colorClass

    return <div className="tile is-parent">
        <article className={articleClasses}>
            <p className="title">{title}</p>
            <p className="subtitle">{text}</p>
            <a className={btnClasses} href="#">Go here!</a>
        </article>
    </div>

}





export default Card

