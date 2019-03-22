import React, { Component } from 'react'
import Navbar from './Navbar'

class History extends Component {
    render() {
        return <div className='page'>
            <Navbar />
            <div className="content">
                <section className="section">
                    <p className="is-size-4">History</p>
                </section>
            </div>
        </div>
    }
}




export default History