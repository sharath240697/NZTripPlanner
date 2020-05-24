import React from 'react';
import * as ReactDOM from 'react-dom'
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; configure({ adapter: new Adapter() });
import 'jest-enzyme';
import searchPlaceTo from '../Components/SearchPlaceTo/SearchPlaceTo';
import MapComponent from '../Components/MapComponent/MapComponent';

it('renders empty search from component', () => {
    const wrapper = shallow(<SearchPlaceTo />);  
    expect(wrapper.find('div')).toExist();
    expect(wrapper.find('div').children().length).toBe(0);
})