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
    section: 'current',
    location: undefined,
    units: undefined,
    current: undefined,
    hourly: undefined,
    forecast: undefined
  }

  handleSectionChange = ( section ) => this.setState({ section });

  handleUnitChange = ( units ) => this.setState({ units });

  handleFetchData = ( lat, lng, loc ) => {

    // const url = `https://crossorigin.me/https://api.darksky.net/forecast/${config.WEATHER_API_KEY}/${lat},${lng}?exclude=minutely&units=us`;
    const url = `http://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${config.WEATHER_API_KEY}/${lat},${lng}?exclude=minutely&units=us`;


    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          location: loc,
          units: json.flags.units,
          current: json.currently,
          hourly: json.hourly,
          forecast: json.daily
        })
      })
      .catch(e => console.log(e))

  }

  render() {

    const renderSection = () => {
      switch (this.state.section) {
        case 'current':
          if (this.state.current !== undefined) {
            return (
              <CurrentInfo
                current={this.state.current} units={this.state.units}/>
              )
          }
        case 'hourly':
          if (this.state.hourly !== undefined) {
            return (
              <HourlyInfo
                hourly={this.state.hourly}
                units={this.state.units}
              />
            )
          }
        case 'forecast':
          if (this.state.forecast !== undefined) {
            return (
              <ForecastInfo
                units={this.state.units}
                forecast={this.state.forecast}
              />
            )
          }
      }
    }

    return (
      <div className="wrapper">
        {console.log(this.state)}
        <div className="currentCard">
        {
          this.state.current !== undefined &&
            <CurrentCard
              location={this.state.location}
              current={this.state.current}
              units={this.state.units}
            />
        }
      </div>

      <div className="infoCard">
        <div className="infoCard__nav-search">
          <PageLinks
            handleSectionChange={this.handleSectionChange}
            handleUnitChange={this.handleUnitChange}
          />
          <Search handleFetchData={this.handleFetchData}/>
        </div>
        <div className="infoCard__info">
          {renderSection()}
        </div>
      </div>
    </div>
    )
  }

}

export default WeatherApp;
