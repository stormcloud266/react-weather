import React from 'react';

const PageLinks = (props) => {

  return (
    <div>
      <div>
        <a onClick={() => props.handleSectionChange('current')}>Current</a>
        <a onClick={() => props.handleSectionChange('hourly')}>Hourly</a>
        <a onClick={() => props.handleSectionChange('forecast')}>5 Day</a>
      </div>
      <div>
        <a onClick={() => props.handleUnitChange('imperial')}>Imperial</a>
        <a onClick={() => props.handleUnitChange('metric')}>Metric</a>
      </div>
    </div>
  )
}

export default PageLinks;
