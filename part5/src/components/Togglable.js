import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';



const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' },
        showWhenVisible = { display: visible ? '' : 'none' },
        toggleVisibility = () => { setVisible(!visible); };

  useImperativeHandle(ref, () => {return { toggleVisibility }; });

  return (
    <>
      <div style={ hideWhenVisible }>
        <button onClick={() => toggleVisibility() }>{ props.buttonLabel }</button>
      </div>
      <div style={ showWhenVisible }>
        { props.children }
        <button onClick={() => toggleVisibility() }>cancel</button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
