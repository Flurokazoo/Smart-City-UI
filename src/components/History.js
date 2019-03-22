import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

class History extends Component {
    state = {
        sectorData: null,
        value: null,
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        let res = await axios.get('https://smartcity-parking-api.herokuapp.com/sectors')
        const sectors = await res.data.data
        const sectorsLinks = await Promise.all(sectors.map(sector => axios.get(sector.self_links.history)))

        console.log(sectorsLinks)

        this.setState({
            sectorData: sectors
        })
    }

    render() {
        const { sectorData, value } = this.state
        let content, loadedContent

        if (sectorData != null) {
            content =
                <div className="columns">
                    <div className="column">
                        <h3>Choose a sector:</h3>

                        <div className="columns is-multiline">
                            {sectorData.map((sector, i) => {
                                let id = sector.sector_id
                                return <div class="column is-1">
                                    <button onClick={this.handleClick} value={id} class="button is-large is-success">{id}</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="column">
                    </div>
                </div>

        } else {
            content = <a class="button is-loading is-large">Content is loading</a>
        }

        return <div className='page'>
            <Navbar />
            <div className="container">
                <div className="content">
                    <section className="section">
                        <h1 className="title is-size-1">Single sector</h1>
                        {content}

                        <hr />

                        {loadedContent}
                    </section>
                </div>
            </div>
        </div>
    }
}




export default History