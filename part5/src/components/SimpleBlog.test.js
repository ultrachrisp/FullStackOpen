import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SImpleBlog';

describe('<SimpleBlog />', () => {
  const mockHandler = jest.fn();
  let component;

  const blog = {
    title: 'Hazit',
    author: 'myBoet',
    likes: 6
  };
  
  beforeEach(() => {
    component = render(
      <SimpleBlog blog={ blog } onClick={ mockHandler }/>
    );
  });

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Hazit myBoet'
    );
  });

  test('like button renders', () => {
    const likeDisplay = component.container.querySelector('div:nth-child(2)');
    expect(likeDisplay).toHaveTextContent(
      'blog has 6 likes'
    );
  });

  test('button clicks', () => {
    const likeButton = component.container.querySelector('button');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
