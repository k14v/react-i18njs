// Core
import React from 'react';
// Test
import test from 'ava';
import {mount} from 'enzyme';
import sinon from 'sinon';
// I18n library
import i18njs from '@k14v/i18njs';
// Providers
import I18nProvider from './I18nProvider';
// Decorators
import withI18n from './withI18n';


const BaseComponent = _ => <p>Hello World!</p>;

const WrappedComponent = withI18n()(BaseComponent);

const ProviderComponent = _ => (
  <I18nProvider i18n={i18njs({locales: ['en', 'es', 'pt']})}>
    <WrappedComponent />
  </I18nProvider>
);

test('it should render', (t) => {
  const warnSpy = sinon.spy(console, 'warn');
  const wrapper = mount(<WrappedComponent />);
  t.true(wrapper.exists());
  warnSpy.restore();
});

test('it should render with I18nProvider', (t) => {
  const wrapper = mount(<ProviderComponent />);
  t.true(wrapper.exists());
});
