import React from 'react';
import PropTypes from 'prop-types'
import { Button } from './Button';
const Header = ({ title, onAdd, showAdd }) => {

  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button 
            color = {showAdd ? 'black' : 'purple'}
            onClick={onAdd}
            text= {showAdd ? 'Add' : 'Close'}
        />
    </header>
  )
};

//Creates a default prop to our component header
Header.defaultProps = {
    title: 'Task Tracker',
}

//Defines the type of prop as string
Header.propTypes = {
    title: PropTypes.string.isRequired,
}
export default Header;
