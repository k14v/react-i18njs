// Core
import React from 'react';
// Testing
import { render } from '@testing-library/react';
import { Consumer } from './testUtils';


describe('I18nConsumer', () => {

  it('should throw a warning, when try to use a consumer without provider', () => {
    jest.spyOn(console, 'warn');
    render(<Consumer />);
    expect(console.warn).toBeCalledTimes(1);
    console.warn.mockRestore();
  });

});
