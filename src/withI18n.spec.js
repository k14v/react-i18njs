// Core
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
// Test
import {act} from 'react-dom/test-utils';
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

test('it\'s forwarding the ref', (t) => {
  const INITIAL_VALUE = 'Popeye';
  const Inner = React.forwardRef((props, ref) => {
    t.truthy(ref);
    t.true(ref.current === INITIAL_VALUE);
    return (
      <button ref={ref} {...props} type="button" />
    );
  });
  const Wrapper = withI18n()(Inner);
  const Provider = (props) => {
    const ref = useRef(INITIAL_VALUE);
    return (
      <I18nProvider i18n={i18njs({locales: ['en', 'es', 'pt']})}>
        <Wrapper ref={ref} />
      </I18nProvider>
    );
  };
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <Provider />,
      container,
    );
  });
  document.body.removeChild(container);
});
