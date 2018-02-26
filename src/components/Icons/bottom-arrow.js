import React from 'react';
import PropTypes from 'prop-types';

const BottomArrowIcon = ({
  width = 11,
  height = 16,
  color = '#1785fb',
  ...others
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      {...others}
      viewBox="0 0 11 16"
    >
      <path d="M0.856917295,10.1464466 L5.01970529,14.2928932 L5.01970529,0.535714286 C5.01970529,0.239847455 5.24444515,0 5.52167582,0 C5.79890649,0 6.02364635,0.239847455 6.02364635,0.535714286 L6.02364635,14.2928932 L10.1430827,10.1896281 C10.3391144,9.99436593 10.6569446,9.99436593 10.8529762,10.1896281 C11.0490079,10.3848902 11.0490079,10.7014727 10.8529762,10.8967349 L5.87662259,15.8535534 C5.77860674,15.9511845 5.65014128,16 5.52167582,16 C5.39321036,16 5.2647449,15.9511845 5.16672906,15.8535534 L0.147023764,10.8535534 C-0.0490079214,10.6582912 -0.0490079214,10.3417088 0.147023764,10.1464466 C0.34305545,9.95118446 0.660885609,9.95118446 0.856917295,10.1464466 Z" />
    </svg>
  );
};

BottomArrowIcon.propTypes = {
  width: PropTypes.oneOf([11, 22, 33]),
  height: PropTypes.oneOf([16, 32, 48]),
  color: PropTypes.string
};

export default BottomArrowIcon;
