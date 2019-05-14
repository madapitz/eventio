import React from 'react';
import classes from './Registration.module.css';

const registration = (props) => {
  return (
    <div className={classes.Registration}>
      <div className={classes.Image}>
        <h1>E.</h1>

        <div>
          <h2>"Great, kid. Don't get cocky."</h2>
          <hr />
          <p>Han Solo</p>
        </div>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
}

export default registration;
