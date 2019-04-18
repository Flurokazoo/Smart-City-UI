import React, { Component } from 'react'
import Herosub from './Herosub'
import axios from 'axios'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from 'moment'
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Line } from 'react-chartjs-2'


class History extends Component {
    state = {
        sectorData: null,
        baseUrl: null,
        nextUrl: null,
        value: null,
        dates: [new Date(), new Date()],
        set: false,
        history: [],
        historyLoaded: false,
        data: null,
        labels: []
    }

    componentDidMount() {
        this.getData()
        this.updateData()
    }

    updateData() {
        this.setState({
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            }
        })
    }

    handleClick = ({ target }) => {
        const { sectorData } = this.state
        sectorData.map((sector) => {
            if (sector.sector_id == target.value) {
                this.setState({
                    baseUrl: sector.self_links.history,
                    nextUrl: sector.self_links.history,
                    value: sector.sector_id
                })
            }
        })
    }

    onChange = dates => {
        console.log(' change')
        this.setState({
            dates: dates,
            set: true,
            history: [],
            labels: []
        }, () => {
            this.getHistory();
        })
    }

    getHistory = async () => {
        const { baseUrl, nextUrl, dates } = this.state
        let { history, labels } = this.state

        let res = await axios.get(nextUrl, {
            params: {
                start: moment(dates[0]).unix(),
                end: moment(dates[1]).unix(),
                limit: 100000
            }
        })
        await res.data.data.entries.map((entry) => {
            history.push(entry.average_occupance * 100)
            labels.push(moment.unix(entry.timestamp).format())
        })
        this.setState({
            history: history,
            labels: labels
        })
        if (res.data.pagination.next_url) {
            this.setState({
                nextUrl: res.data.pagination.next_url,
                historyLoaded: false
            })
            this.getHistory()
        } else {
            this.setState({
                historyLoaded: true,
                nextUrl: baseUrl
            })
        }
    }

    getData = async () => {
        let res = await axios.get('https://smartcity-parking-api.herokuapp.com/sectors')
        const sectors = await res.data.data

        this.setState({
            sectorData: sectors
        })
    }

    render() {
        const { sectorData, value, history, historyLoaded, data } = this.state
        let content, loadedContent, setContent

        if (value != null) {
            loadedContent =
                <article class="message is-link" style={{ height: '100%' }}>
                    <div class="message-header">
                        <h2 class='has-text-white'>Choose a sector below:</h2>
                    </div>
                    <div class="message-body">
                        <DateRangePicker
                            onChange={this.onChange}
                            value={this.state.dates}
                        />
                    </div>
                </article>

        }

        if (sectorData != null) {
            content =
                <div className="columns">
                    <div className="column">
                        <article class="message is-link" style={{ height: '100%' }}>
                            <div class="message-header">
                                <h2 class='has-text-white'>Choose a sector below:</h2>
                            </div>
                            <div class="message-body">
                                <div class='columns is-multiline'>
                                    {sectorData.map((sector, i) => {
                                        let id = sector.sector_id
                                        return <button style={{ display: 'inline-block', marginLeft: 10 }} onClick={this.handleClick} value={id} class="button is-large is-danger is-outlined">{id}</button>

                                    })}
                                </div>

                            </div>
                        </article>
                    </div>
                    <div className="column">
                        {loadedContent}
                    </div>
                </div>
        } else {
            content = <a class="button is-loading is-large">Content is loading</a>
        }

        if (historyLoaded === true) {
            console.log(data)
            setContent =
                <div className="columns">
                    <div className="column">
                    <Line data={data} />
                        {/* <ResponsiveContainer width='100%' aspect={4.0 / 3.0} height={250} >
                            <LineChart data={history.slice()}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis dataKey="occupance" />
                                <YAxis type="number" domain={[0, 100]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="occupance" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer> */}
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
                        {setContent}
                    </section>
                </div>
            </div>
        </div>
    }
}

export default History