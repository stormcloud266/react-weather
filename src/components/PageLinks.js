import React from 'react';

const PageLinks = (props) => {

  return (
    <div className="page-links">
      <div className="page-links__forecast-options">
        <a onClick={() => props.handleSectionChange('current')}>Current</a>
        <a onClick={() => props.handleSectionChange('hourly')}>Hourly</a>
        <a onClick={() => props.handleSectionChange('forecast')}>5 Day</a>
      </div>
      <div className="page-links__unit-options">
        <a onClick={() => props.handleUnitChange('us')}>Imperial</a>
        <a onClick={() => props.handleUnitChange('is')}>Metric</a>
      </div>
    </div>
  )
}

export default PageLinks;
