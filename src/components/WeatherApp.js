import React from 'react';
import PageLinks from './PageLinks';
import CurrentCard from './CurrentCard';
import Search from './Search';
import CurrentInfo from './CurrentInfo';
import HourlyInfo from './HourlyInfo';
import ForecastInfo from './ForecastInfo';
import config from '../../config.json';
import openSocket from 'socket.io-client';
const socket = openSocket('/');


class WeatherApp extends React.Component {
  state = {
    loading: false,
    error: {
      status: false,
      message: ''
    },
    section: 'current',
    location: undefined,
    units: 'us',
    current: undefined,
    hourly: undefined,
    forecast: undefined
  }

  componentDidMount () {
    socket.on('weatherJSON', data => this.handleWeatherData(data))
    socket.on('setLocation', location => this.setState({ location }))


    socket.on('error', error => {
      this.setState({ error }, () => {
        if (error.status) {
          this.resetState()
        }
      })
    }); // end of on error
  }

  resetState = () => {
    this.setState({
      loading: false,
      location: undefined,
      current: undefined,
      hourly: undefined,
      forecast: undefined

    })
  }

  tempConversion = (temp) => {
    if (this.state.units === 'us') {
      return Math.round(temp) + '˚';
    } else if (this.state.units === 'is') {
      return Math.round((temp - 32) * 5/9) + '˚';
    }
  }

  timeConversion = (time, format) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    if (format === 'hour') {
      return new Date(time * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else if (format === 'day') {
      return days[new Date(time * 1000).getDay()];
    }
  }

  iconSelector = (respIcon) => {
    switch (respIcon) {
      case 'clear-day':
        return 'wi-day-sunny';
      case 'clear-night':
        return 'wi-night-clear';
      case 'rain':
        return 'wi-rain';
      case 'snow':
        return 'wi-snow';
      case 'sleet':
        return 'wi-sleet';
      case 'wind':
        return 'wi-strong-wind';
      case 'fog':
        return 'wi-fog';
      case 'cloudy':
        return 'wi-cloudy';
      case 'partly-cloudy-day':
        return 'wi-day-sunny-overcast';
      case 'partly-cloudy-night':
       return 'wi-night-partly-cloudy';
    }

  }

  handleSectionChange = ( section ) => this.setState({ section });

  handleUnitChange = ( units ) => this.setState({ units });

  handleFetchLocationData = (location) => {
    this.setState({ loading: true }, () => {
      socket.emit('sendLocation', location)
    })
  }

  handleWeatherData = ( data ) => {
    console.log(data);

    this.setState({
      loading: false,
      error: {
        status: false,
        message: '',
      },
      units: data.flags.units,
      current: data.currently,
      hourly: data.hourly,
      forecast: data.daily
    });
  }

  render() {

    const renderSection = () => {
      switch (this.state.section) {
        case 'current':
          if (this.state.current !== undefined) {
            return (
              <CurrentInfo
                current={this.state.current}
                units={this.state.units}
                tempConversion={this.tempConversion}
              />
              )
          }
        case 'hourly':
          if (this.state.hourly !== undefined) {
            return (
              <HourlyInfo
                hourly={this.state.hourly}
                units={this.state.units}
                tempConversion={this.tempConversion}
                timeConversion={this.timeConversion}
                iconSelector={this.iconSelector}
              />
            )
          }
        case 'forecast':
          if (this.state.forecast !== undefined) {
            return (
              <ForecastInfo
                units={this.state.units}
                forecast={this.state.forecast}
                tempConversion={this.tempConversion}
                timeConversion={this.timeConversion}
                iconSelector={this.iconSelector}
              />
            )
          }
      }
    }

    return (
      <div className="wrapper">
        <div className="current-card">
        {
          this.state.current !== undefined &&
          this.state.loading !== true &&
            <CurrentCard
              location={this.state.location}
              current={this.state.current}
              units={this.state.units}
              tempConversion={this.tempConversion}
              iconSelector={this.iconSelector}
            />
        }
      </div>

      <div className="info-card">
        <div className="info-card__nav-search">
          <PageLinks
            handleSectionChange={this.handleSectionChange}
            handleUnitChange={this.handleUnitChange}
            section={this.state.section}
            units={this.state.units}
          />
          <Search
            handleFetchLocationData={this.handleFetchLocationData}
          />
          {
            !this.state.current &&
            !this.state.loading &&
            !this.state.error.status &&
              <p className='select'>which forecast are we grabbin?</p>
          }
          {
            this.state.loading &&
              <p className='select'>calling my psychic...</p>
          }
          {
            this.state.error &&
            !this.state.loading &&
              <p className='select'>{this.state.error.message}</p>
            }


        </div>
        <div className="info-card__info">
          {!this.state.loading && renderSection()}
        </div>
      </div>
    </div>
    )
  }

}

export default WeatherApp;
