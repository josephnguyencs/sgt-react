import React from 'react';

function Header(props) {
  return (
    <div>
      <h1>Student Grade Table</h1>
      <h1>{props.avg}</h1>
    </div>
  );
}

export default Header;
