import React from 'react';
import PageLinks from './PageLinks';
import CurrentCard from './CurrentCard';
import Search from './Search';
import CurrentInfo from './CurrentInfo';
import HourlyInfo from './HourlyInfo';
import ForecastInfo from './ForecastInfo';
import config from '../../config.json';


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

  handleFetchLocationData = (searchTerm) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${config.GEOCODE_API_KEY}`
    this.setState({ loading: true }, () => {
      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.status === 'ZERO_RESULTS') {
          this.setState({
            error: {
              status: true,
              message: 'i can\'t seem to find this location... is it spelled correctly?',
            }
          }, this.resetState())
        } else {
          this.setState({
            error: {
              status: false,
              message: '',
            },
          })
          const lat = json.results[0].geometry.location.lat;
          const lng = json.results[0].geometry.location.lng;
          const loc = json.results[0].formatted_address;
          this.handleFetchWeatherData(lat, lng, loc);
        }
      })
      .catch(e => {
        this.setState({
          error: {
            status: true,
            message: 'looks like there was a problem fetching the location data.'
          }
        }, this.resetState())
      })
    })
  }

  handleFetchWeatherData = ( lat, lng, loc ) => {
    const url = `https://crossorigin.me/https://api.darksky.net/forecast/${config.WEATHER_API_KEY}/${lat},${lng}?exclude=minutely&units=us`;

    // const url = `http://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${config.WEATHER_API_KEY}/${lat},${lng}?exclude=minutely&units=us`;

      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.code === 400) {
            this.setState({
              error: {
                status: true,
                message: 'looks like there was a problem fetching the weather data.'
              }
            }, this.resetState())
          } else {
            this.setState({
              loading: false,
              error: {
                status: false,
                message: '',
              },
              location: loc,
              units: json.flags.units,
              current: json.currently,
              hourly: json.hourly,
              forecast: json.daily
            })
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({
            error: {
              status: true,
              message: 'oh no! i couldn\'t find the weather data.'
            }
          }, this.resetState())
        })
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
        {console.log(this.state)}
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
