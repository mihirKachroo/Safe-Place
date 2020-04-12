import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100vw;
  height: 15vw;
justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 15px;
  list-style: none;
  text-align: left;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #5cbd9d;
  border-bottom: 1px solid #fff;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  padding: 15px 15px 15px 0;
  color: #fff;
  text-size: 
    font-weight: 400;
  font-size: 2rem;

  text-decoration: none;
  text-align: center;
`;

const defaultPath = process.env.REACT_APP_BASE_PATH;

const Home = () => (
  <Wrapper>
    <List>
      <ListItem>
        <StyledLink to={`${defaultPath}marker-info-window-gmaps-obj`}>View the Map</StyledLink>
      </ListItem>
    </List>
  </Wrapper>
);

export default Home;
