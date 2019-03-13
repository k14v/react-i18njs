// Core
import React from 'react';
import ReactDOM from 'react-dom';
// Test
import {act} from 'react-dom/test-utils';
import test from 'ava';
import {shallow} from 'enzyme';
// I18n library
import i18njs from '@k14v/i18njs';
// Provider
import I18nProvider from './I18nProvider';
// Hooks
import useI18n from './useI18n';
// Constants
import {I18N_EVENTS} from './constants';


const locales = {
  es: {
    'Hello World': 'Hola Mundo',
  },
  en: {
    'Hello World': 'Hello World',
  },
};

const Provider = ({i18n, children}) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

const Consumer = (_) => {
  const i18n = useI18n();
  return (
    <p>{i18n.trls.__('Hello World')}</p>
  );
};

test.cb('it should render', (t) => {
  t.timeout(10000);
  t.plan(1);
  const i18n = i18njs({locales, locale: 'es'});
  i18n.subscribe(({type}) => {
    if (type === I18N_EVENTS.LOADED) {
      const wrapper = shallow(
        <Provider i18n={i18njs({locales, locale: 'es'})}>
          <Consumer />
        </Provider>
      );
      t.true(wrapper.exists());
      t.end();
    }
  });
});

test.cb('it should translate', (t) => {
  t.timeout(10000);
  t.plan(1);
  const i18n = i18njs({locales, locale: 'es'});
  i18n.subscribe(({type}) => {
    if (type === I18N_EVENTS.LOADED) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      act(() => {
        ReactDOM.render(
          <Provider i18n={i18njs({locales, locale: 'es'})}>
            <Consumer />
          </Provider>,
          container
        );
      });
      const p = container.querySelector('p');
      t.true(p.textContent === locales.en['Hello World']);
      t.end();
    }
  });
});
