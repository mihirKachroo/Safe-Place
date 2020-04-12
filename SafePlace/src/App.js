import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.section`

`;

const App = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

App.defaultProps = {
  children: {},
};

export default App;
