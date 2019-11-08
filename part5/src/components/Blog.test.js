import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog />', () => {
  // const mockHandler = jext.fn();
  let component;

  const blog = {
    title: 'Hazit',
    author: 'myBoet',
    likes: 6,
    user:[
      { username: 'myGuy' }
    ]
  };

  beforeEach(() => {
    component = render(
      <Blog blog={ blog } />
    );
  });

  test('at start, only the summary is displayed', () => {
    const summary = component.container.querySelector('div:nth-child(2)');

    // console.log(prettyDOM(summary));
    
    expect(summary).toHaveStyle('display: none');
  });

  test('after clicking the title, more details are displayed', () => {
    const title = component.container.querySelector('.toggleSwitch');
    fireEvent.click(title);

    const detailed = component.container.querySelector('div:nth-child(2)');
    expect(detailed).not.toHaveStyle('display: none');
  });
  
});
