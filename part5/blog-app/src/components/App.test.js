import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('../services/blogs');
import { prettyDOM } from '@testing-library/dom';
import App from './App';

describe ('<App />', () => {
  test('if no user logged in, blogs are not rendered', async () => {
    const component = render(
      <App />
    );
    component.rerender(<App />);
    
    await waitForElement(() => component.container.querySelector('.login'));
    
    const login = component.container.querySelector('.login').parentElement;
    expect(login).toHaveStyle('display: none');
  });

  test('if a user is logged in, blogs are rendered', async () => {
    const user = {
      username: "ChrispGuy",
      name: "Chrisp",
      token: '1231231214',
    };

    localStorage.setItem('loggedBlogUser', JSON.stringify(user));
    const component = render(
      <App />
    );    
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.blog'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(2);

    expect(component.container).toHaveTextContent(
      'Test blog alpha'
    );
    
    expect(component.container).toHaveTextContent(
      'Test blog beta'
    );
    
    // console.log(component.container);

    // console.log(prettyDOM(component.container));
  });
});
