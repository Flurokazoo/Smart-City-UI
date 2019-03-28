import React from 'react'
import Navbar from './Navbar'
import Herosub from './Herosub'

const Grid = (props) =>{
    return <div className='page'>
        <Herosub />
        <div className="content">
            <section className="section">
                <p className="is-size-4">Grid</p>
            </section>
        </div>
    </div>

}

export default Grid