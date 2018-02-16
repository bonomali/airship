import PropTypes from 'prop-types';

const getFont = (props) => {
  return props.font && props.font === 'mono'
    ? `Overpass Mono, monospace`
    : `Roboto, sans-serif`;
};

const getWeight = (props) => {
  if (props.font === 'mono') {
    return 400;
  }
  return props.weight ? (props.weight === 'medium' ? 500 : 400) : null;
};

const BaseText = (props) => {
  const { as, basic } = props;
  return (as ? basic.withComponent(as) : basic).extend`
    color: ${props.color};
    margin: ${props.margin || 0};
    font-family: ${getFont(props)};
    font-weight: ${getWeight(props)};
  `;
};

BaseText.propTypes = {
  as: PropTypes.oneOf(['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  color: PropTypes.string,
  margin: PropTypes.string,
  font: PropTypes.oneOf(['normal', 'mono']),
  weight: PropTypes.oneOf(['regular', 'medium'])
};

export default BaseText;
