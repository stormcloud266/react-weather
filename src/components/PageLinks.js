import React from 'react';

const PageLinks = (props) => {

  return (
    <div className="page-links">
      <div className="page-links__forecast-options">
        <a
          className={props.section === 'current' ? 'active' : undefined}
          onClick={() => props.handleSectionChange('current')}
          >Current
        </a>
        <a
          className={props.section === 'hourly' ? 'active' : undefined}
          onClick={() => props.handleSectionChange('hourly')}>
          Hourly
        </a>
        <a
          className={props.section === 'forecast' ? 'active' : undefined}
          onClick={() => props.handleSectionChange('forecast')}>
          3 Day
        </a>
      </div>
      <div className="page-links__unit-options">
        <a
          className={props.units === 'us' ? 'active' : undefined}
          onClick={() => props.handleUnitChange('us')}>
          Imperial
        </a>
        <a
          className={props.units === 'is' ? 'active' : undefined}
          onClick={() => props.handleUnitChange('is')}>
          Metric
        </a>
      </div>
    </div>
  )
}

export default PageLinks;
