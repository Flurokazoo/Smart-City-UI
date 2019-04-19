import React, { Component } from 'react'
import Herosub from './Herosub'
import axios from 'axios'


class Sectors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sectors: false,
            loading: 'initial'
        }
    }


    componentDidMount() {
        console.log('waddap')
        this.getData()
    }

    getData = async () => {
        let res = await axios.get('https://smartcity-parking-api.herokuapp.com/sectors')
        const sectors = await res.data.data
        this.setState({
            sectors: sectors,
            loading: 'false'
        })
    }
    render() {
        const { sectors, loading } = this.state
        let content

        if (loading === 'false') {
            content = <section className="section">
                <div class="tile is-ancestor">

                    {sectors.map((sector, i) => {
                        let occupanceClass
                        const occupance = Math.round(sector.occupance_percentage * 100)

                        if(occupance < 65 || occupance > 85) {
                            occupanceClass="has-text-danger"                            
                        }else {
                            occupanceClass="has-text-success"
                        }
                        console.log(sector)
                        return <div class="tile is-parent is-4">
                            <article class="tile is-child notification">
                                <div class="content">
                                    <p class="title has-text-centered">Sector {sector.sector_id}</p>

                                    <div class="content">
                                        <div class="content has-text-centered">
                                            <h2>Current parking occupation: <strong class={occupanceClass}>{Math.round(sector.occupance_percentage * 100)}%</strong></h2>
                                        </div>
                                        <div class="content has-text-centered">
                                            <h3>API links:</h3>
                                            <div class="is-divider"></div>
                                            <p><strong>Details:</strong> <code><a href={sector.self_links.detail}>{sector.self_links.detail}</a></code></p>
                                            <p><strong>History:</strong> <code><a href={sector.self_links.history}>{sector.self_links.history}</a></code></p>
                                            <div class="is-divider"></div>

                                        </div>
                                        <div class="content has-text-centered">
                                            <a class="button is-link is-large" style={{ marginTop: 10 }}>Go to sector details</a>
                                            <a class="button is-link is-large" style={{ marginTop: 10 }}>Go to sector history</a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    })}
                </div>
            </section>
        } else {
            content = <h1>HALLO</h1>
        }
        return <div className='page'>
            <Herosub />
            <div className="container">
                <div className="content">
                    {content}
                </div>
            </div>
        </div>
    }

}

export default Sectors