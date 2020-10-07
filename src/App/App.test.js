import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<App />);
});
