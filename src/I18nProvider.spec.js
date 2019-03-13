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

const Provider = ({i18n, children}) => (
  <I18nProvider i18n={i18n}>{children}</I18nProvider>
);

const Consumer = () => {
  const {trls} = useI18n();
  return <p>{trls.__('Hello World')}</p>;
};

test('it should render', (t) => {
  const wrapper = shallow(<I18nProvider i18n={i18njs({locales, locale: 'es'})} />);
  t.true(wrapper.exists());
});

test.cb('it should have the text translated', (t) => {
  t.timeout(10000);
  t.plan(1);
  const i18n = i18njs({locales, locale: 'es'});
  i18n.subscribe(({type}) => {
    if (type === I18N_EVENTS.LOADED) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      act(() => {
        ReactDOM.render(
          <Provider i18n={i18n}>
            <Consumer />
          </Provider>,
          container
        );
      });
      t.true(container.querySelector('p').textContent === i18n.trls.__('Hello World'));
      t.end();
    }
  });
});

// Need to improve the test
test.skip('it should update the text after a setLanguage', (t) => {
  t.timeout(10000);
  t.plan(2);
  const i18n = i18njs({locales, locale: 'es'});
  i18n.subscribe(({type, locale}) => {
    if (type === I18N_EVENTS.LOADED) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      act(() => {
        ReactDOM.render(
          <Provider i18n={i18n}>
            <Consumer />
          </Provider>,
          container
        );
      });
      if (locale === 'es') {
        t.log(container.querySelector('p').textContent);
        t.true(container.querySelector('p').textContent === i18n.trls.__('Hello World'));
        // Set language
        act(() => {
          i18n.setLocale('en');
        });
      }
      if (locale === 'en') {
        t.true(document.querySelector('p').textContent === i18n.trls.__('Hello World'));
        t.end();
      }
    }
  });
});
