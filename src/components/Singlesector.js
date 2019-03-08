import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

class Singlesector extends Component {
    render() {
        return <div className='page'>
            <Navbar />
            <div className="container">
                <div className="content">
                    <section className="section">
                        <h1 className="title is-size-1">Single sector</h1>

                        <div class="field">
                            <label class="label">Subject</label>
                            <div class="control">
                                <div class="select is-large">
                                    <select>
                                        <option>Select dropdown</option>
                                        <option>With options</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </section>
                </div>
            </div>
        </div>

    }
}

export default Singlesector