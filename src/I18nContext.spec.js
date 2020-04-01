// Core
import React from 'react';
// Testing
import test from 'ava';
import render from '@test/customRender';
import sinon from 'sinon';
import { Consumer } from '@test/testUtils';


test('it should throw a warning, when try to use a consumer without provider', (t) => {
  const warnSpy = sinon.spy(console, 'warn');
  render(<Consumer />);
  t.true(warnSpy.calledOnceWithExactly('I18nContext - Warning! there is no I18nProvider for I18nContext'));
  warnSpy.restore();
});
