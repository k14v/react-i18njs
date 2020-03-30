// Core
import React from 'react';
// Testing
import test from 'ava';
import { render, cleanup } from '@testing-library/react';
import sinon from 'sinon';
import { Consumer } from './testUtils';


test.afterEach(cleanup);

test('it should throw a warning, when try to use a consumer without provider', (t) => {
  const warnSpy = sinon.spy(console, 'warn');
  render(<Consumer />);
  t.true(warnSpy.calledOnceWithExactly('I18nContext - Warning! there is no I18nProvider for I18nContext'));
  warnSpy.restore();
});
