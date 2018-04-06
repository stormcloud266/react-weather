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
    units: 'imperial',
    conditions: undefined,
    hourly: undefined,
    forecast: undefined
  };

  handleSectionChange = ( section ) => this.setState({ section });

  handleUnitChange = ( units ) => this.setState({ units });

  handleFetchData = ( lat, lng ) => {

    fetch(`http://api.wunderground.com/api/${config.WEATHER_API_KEY}/conditions/q/${lat},${lng}.json`)
    .then(response => response.json())
    .then(json => {
      this.setState({ conditions: json })
    });

    fetch(`http://api.wunderground.com/api/${config.WEATHER_API_KEY}/hourly/q/${lat},${lng}.json`)
    .then(response => response.json())
    .then(json => {
      this.setState({ hourly: json })
    });

    fetch(`http://api.wunderground.com/api/${config.WEATHER_API_KEY}/forecast10day/q/${lat},${lng}.json`)
    .then(response => response.json())
    .then(json => {
      this.setState({ forecast: json })
    });
  }

  render() {

    const renderSection = () => {
      switch (this.state.section) {
        case 'current':
          if (this.state.conditions !== undefined) {
            return (
              <CurrentInfo
                  units={this.state.units}

                  iFeelsLike={this.state.conditions.current_observation.feelslike_f}
                  mFeelsLike={this.state.conditions.current_observation.feelslike_c}

                  iWindSpeed={this.state.conditions.current_observation.wind_mph}
                  mWindSpeed={this.state.conditions.current_observation.wind_kph}

                  windDirection={this.state.conditions.current_observation.wind_dir}

                  iVisibility={this.state.conditions.current_observation.visibility_mi}
                  mVisibility={this.state.conditions.current_observation.visibility_km}

                  humidity={this.state.conditions.current_observation.relative_humidity}
                />
              )
          }

        case 'hourly':
          if (this.state.hourly !== undefined) {
            return (
              <HourlyInfo
                units={this.state.units}
                hourly={this.state.hourly}
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
      <div>
        <button onClick={() => console.log(this.state)}>Click</button>

        {
          this.state.conditions !== undefined &&
            <CurrentCard
              units={this.state.units}
              loc={this.state.conditions.current_observation.display_location.full}
              iTemp={this.state.conditions.current_observation.temp_f}
              mTemp={this.state.conditions.current_observation.temp_c}
              icon={this.state.conditions.current_observation.icon_url}
              cond={this.state.conditions.current_observation.weather}
            />
        }

        <PageLinks
          handleSectionChange={this.handleSectionChange}
          handleUnitChange={this.handleUnitChange}
        />
        <Search handleFetchData={this.handleFetchData}/>

        {renderSection()}

      </div>
    )
  }

}

export default WeatherApp;
