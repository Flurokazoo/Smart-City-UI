import React, { Component } from 'react'
import Herosub from './Herosub'
import axios from 'axios'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from 'moment'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class History extends Component {
    state = {
        sectorData: null,
        url: null,
        value: null,
        dates: [new Date(), new Date()],
        set: false,
        history: [],
        historyLoaded: false
    }

    componentDidMount() {
        this.getData()
    }

    handleClick = ({ target }) => {
        const { sectorData } = this.state
        sectorData.map((sector) => {
            if (sector.sector_id == target.value) {
                this.setState({
                    url: sector.self_links.history,
                    value: sector.sector_id
                })
            }
        })

    }

    onChange = dates => {
        console.log(dates)
        this.setState({
            dates: dates,
            set: true
        }, () => {
            this.getHistory();
        })


    }

    getHistory = async () => {
        const { url, dates } = this.state
        let { history } = this.state
        const day = 86400

        console.log(moment(dates[1]).unix() - moment(dates[0]).unix())
        let res = await axios.get(url, {
            params: {
                start: moment(dates[0]).unix(),
                end: moment(dates[1]).unix(),
                limit: 100000
            }
        })
        await res.data.data.entries.map((entry) => {
            console.log(entry)
            history.push({
                'name': moment.unix(entry.timestamp).format(),
                'occupance': entry.average_occupance * 100
            })
        })
        this.setState({
            history: history
        })
        if (res.data.pagination.next_url) {
            this.setState({
                url: res.data.pagination.next_url,
                historyLoaded: false
            })
            this.getHistory()
        } else {
            this.setState({
                historyLoaded: true
            })
        }


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
        const { sectorData, value, set, history, historyLoaded } = this.state
        let content, loadedContent, setContent

        if (sectorData != null) {
            content =
                <div className="columns">
                    <div className="column">
                        <h1 class="title is-1">Choose a sector below:</h1>

                        <div className="columns is-multiline">
                            {sectorData.map((sector, i) => {
                                let id = sector.sector_id
                                return <div class="column is-1">
                                    <button onClick={this.handleClick} value={id} class="button is-large is-danger is-outlined">{id}</button>
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

        if (value != null) {
            loadedContent =
                <div className="columns">
                    <div style={{ margin: '0 auto' }}>
                        <DateRangePicker
                            onChange={this.onChange}
                            value={this.state.dates}
                        />
                    </div>
                </div>
        }

        if (historyLoaded === true) {
            setContent =
                <div className="columns">
                    <div className="column">
                        <ResponsiveContainer width='100%' aspect={4.0 / 3.0} height={250} >
                            <LineChart data={history}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis dataKey="occupance" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="occupance" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                </div>



        }

        return <div className='page'>
            <Herosub title='History' />

            <div className="container">
                <div className="content">
                    <section className="section">
                        {content}

                        <hr />

                        {loadedContent}

                        {setContent}
                    </section>
                </div>
            </div>
        </div>
    }
}




export default History