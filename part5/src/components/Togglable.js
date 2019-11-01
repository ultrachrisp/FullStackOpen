import React, {useState} from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => { setVisible(!visible); };

  return (
    <>
      <div style={ hideWhenVisible }>
        <button onClick={() => toggleVisibility(true)}>{ props.buttonLabel }</button>
      </div>
      <div style={ showWhenVisible }>
        { props.children }
        <button onClick={() => toggleVisibility(false)}>cancel</button>
      </div>
    </>
  );
};

export default Togglable;
