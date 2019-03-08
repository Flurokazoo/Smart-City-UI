import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

class Singlesector extends Component {
    state = {
        sectorData: null,
        value: null
    }

    componentDidMount() {
        this.getData()
    }


    getData = async () => {
        let res = await axios.get('https://smartcity-parking-api.herokuapp.com/sectors')
        const sectors = await res.data.data

        const sectorsLinks = await Promise.all(sectors.map(sector => axios.get(sector.self_links.detail)))

        this.setState({
            sectorData: sectorsLinks
        })
    }

    handleChange = ({ target }) => {
        this.setState({
            value: target.value
        })
    }

    handleClick = () => {
        console.log(this.state.value)
    }

    render() {
        const { sectorData, value } = this.state
        let content;
        if (sectorData != null) {
            content = <div className="field">
                <label className="label">Subject</label>
                <div className="field is-grouped">
                    <div className="control">
                        <div className="select is-large">
                            <select onChange={this.handleChange}>
                            <option hidden disabled selected value> Select a sector </option>
                                {sectorData.map((sector, i) => {
                                    return <option value={i}>Sector id: {i}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <button value={value} onClick={this.handleClick} className="button is-link is-large">Select this sector</button>
                </div>

            </div>
        } else {
            content = <p>Wait till content is loaded</p>
        }
        return <div className='page'>
            <Navbar />
            <div className="container">
                <div className="content">
                    <section className="section">
                        <h1 className="title is-size-1">Single sector</h1>
                        {content}

                        <hr></hr>
                    </section>
                </div>
            </div>
        </div>




    }
}

export default Singlesector