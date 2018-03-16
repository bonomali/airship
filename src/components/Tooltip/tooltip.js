import React, { Component, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';

/*
<Tooltip to={bottom|top|left|right}>
  <Tooltip.Content>
    {children}
  </Tooltip.Content>
  <Tooltip.Trigger>
    {children}
  <Tooltip.Trigger>
</Tooltip>
*/

const StyledTooltip = styled.div`
  pointer-events: none;
  font: 400 12px/20px 'Roboto';
  background: rgba(17, 17, 17, 0.9);
  border-radius: 4px;
  color: #fff;
  padding: 0.5em 1em;
  position: absolute;
  white-space: nowrap;

  &:before {
    background: no-repeat
      url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(0)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E');
    background-size: 100% auto;
    width: 18px;
    height: 6px;
    pointer-events: none;
    content: '';
    position: absolute;
  }

  &[data-pos='top'] {
    top: ${(props) => `${props.position.top}px`};
    left: ${(props) => `${props.position.x}px`};
    transform: translate(-25%, calc(-50% - 10px));
    transform-origin: top;
  }

  &[data-pos='top']:before {
    bottom: 0;
    left: 50%;
    margin-bottom: 5px;
    transform: translate(-50%, 10px);
    transform-origin: top;
  }

  &[data-pos='bottom'] {
    top: ${(props) => `${props.position.top}px`};
    left: ${(props) => `${props.position.x}px`};
    transform: translate(-25%, calc(100% + 16px));
    transform-origin: top;
  }

  &[data-pos='bottom']:before {
    top: 0;
    left: 50%;
    transform: translate(-10px, 0) rotate(180deg);
    transform-origin: top;
  }

  &[data-pos='right'] {
    top: ${(props) => `${props.position.top}px`};
    left: ${(props) => `${props.position.x + props.position.width}px`};
    transform: translate(10px, calc(50% - 6px));
    transform-origin: top;
  }

  &[data-pos='right']:before {
    top: 50%;
    left: 0;
    transform: translate(-8px, 0) rotate(90deg);
    transform-origin: top;
  }

  &[data-pos='left'] {
    top: ${(props) => `${props.position.top}px`};
    left: ${(props) => `${props.position.x}px`};
    transform: translate(calc(-100% - 10px), calc(50% - 6px));
    transform-origin: top;
  }

  &[data-pos='left']:before {
    top: 50%;
    right: 0;
    transform: translate(8px, 0) rotate(-90deg);
    transform-origin: top;
  }
`;

const Content = ({ children, ...props }) => {
  let domNode = document.getElementById('tooltip');
  if (!domNode) {
    domNode = document.createElement('div');
    domNode.setAttribute('id', 'tooltip');
    document.body.appendChild(domNode);
  }

  return ReactDOM.createPortal(
    <StyledTooltip {...props}>{children}</StyledTooltip>,
    domNode
  );
};
Content.displayName = 'Tooltip.Content';

const Trigger = ({ children }) => {
  return children;
};
Trigger.displayName = 'Tooltip.Trigger';

const Wrapper = styled.span`
  position: relative;
`;

class Tooltip extends Component {
  static Content = Content;
  static Trigger = Trigger;

  state = {
    visible: false
  };

  componentDidMount() {
    this.timer = null;
    this.position = this.node.getBoundingClientRect();

    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('touchstart', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  }

  onWindowClick = (event) => {
    const tooltipElement = findDOMNode(this);
    const { visible } = this.state;

    if (
      event.target !== tooltipElement &&
      tooltipElement !== event.target.closest('[data-component=Tooltip]') &&
      visible
    ) {
      this.hide();
    }
  };

  toggle = (visible) => {
    this.setState((state) => {
      return { ...state, visible: visible };
    });
  };

  show = () => {
    this.toggle(true);
  };

  hide = () => {
    this.toggle(false);
  };

  render() {
    const { children, as, to } = this.props;
    const { visible } = this.state;
    const Node = as !== 'span' ? Wrapper.withComponent(as) : Wrapper;

    return (
      <Node
        data-component="Tooltip"
        onMouseEnter={(e) => this.show()}
        onMouseLeave={(e) => this.hide()}
        data-pos={to}
      >
        {Children.map(children, (child) => {
          let element = null;
          if (child.type.displayName === 'Tooltip.Trigger') {
            element = (
              <span
                ref={(node) => {
                  this.node = node;
                }}
              >
                {child}
              </span>
            );
          } else if (child.type.displayName === 'Tooltip.Content' && visible) {
            element = React.cloneElement(child, {
              position: this.position,
              'data-pos': to
            });
          }
          return element;
        })}
      </Node>
    );
  }
}

Tooltip.defaultProps = {
  as: 'span',
  to: 'top'
};

Tooltip.propTypes = {
  as: PropTypes.string,
  to: PropTypes.oneOf(['bottom', 'right', 'left', 'top'])
};

export default Tooltip;
