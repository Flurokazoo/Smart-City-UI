import React, { Component } from 'react'
import Herosub from './Herosub'
import axios from 'axios'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from 'moment'
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
        const { labels, history } = this.state
        let min = []
        let max = []
        console.log(labels.length)
        for (let i = 0; i < labels.length; i++) {
            min[i] = 65
            max[i] = 85            
        }
        this.setState({
            data: {
                labels: labels,
                datasets: [
                    
                    {
                        label: 'Min',
                        fill: 'start',
                        lineTension: 0.1,
                        backgroundColor: 'rgba(255,0,0,0.1)',
                        borderColor: 'rgba(128,128,128,0.5)',
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
                        data: min,                        
                    },
                    {
                        label: 'Parking data',
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
                        data: history,                        
                    },
                    {
                        label: 'Max',
                        fill: 'end',
                        lineTension: 0.1,
                        backgroundColor: 'rgba(255,0,0,0.1)',
                        borderColor: 'rgba(128,128,128,0.5)',
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
                        data: max,                        
                    },
                    
                    
                    
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
        const day = 86400
        const hour = 3600
        const difference = (moment(dates[1]).unix() - moment(dates[0]).unix()) / day
        let interval

        switch(true) {
            case (difference < 1):
                interval = hour
                break
            case (difference >= 1 && difference < 3):
                interval = hour * 2
                break
            case (difference >= 3 && difference < 7):
                interval = hour * 6
                break
            case (difference >= 7 && difference < 14):
                interval = hour * 12
                break
            case (difference >= 14):
                interval = hour * 24
                break

        }

        let res = await axios.get(nextUrl, {
            params: {
                start: moment(dates[0]).unix(),
                end: moment(dates[1]).unix(),
                interval: interval
            }
        })
        await res.data.data.entries.map((entry) => {
            history.push(Math.round(entry.average_occupance * 100))
            labels.push(moment.unix(entry.timestamp).format("dddd, MMMM Do YYYY, HH:mm"))
        })       

        this.setState({
            history: history,
            labels: labels
        })

        this.updateData()

        if (res.data.pagination.next_url) {
            this.setState({
                nextUrl: res.data.pagination.next_url,
                historyLoaded: false
            })
            this.getHistory()
        } else {
            this.setState({
                historyLoaded: true,
                nextUrl: baseUrl,
                history: history.reverse(),
                labels: labels.reverse()
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
        const { sectorData, value, dates, historyLoaded, data } = this.state
        let content, loadedContent, setContent

        if (value != null) {
            loadedContent =
                <article class="message is-link" style={{ height: '100%' }}>
                    <div class="message-header">
                        <h2 class='has-text-white'>Choose a date range below:</h2>
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
                    <h1>History of sector {value} between {moment(dates[0]).calendar()} and {moment(dates[1]).calendar()}</h1>
                    <Line data={data}
                        options={{
                            scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    min: 0,
                                    max: 100    
                                }
                              }]
                           },
                           legend: {
                               display: false
                           }}} />          
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