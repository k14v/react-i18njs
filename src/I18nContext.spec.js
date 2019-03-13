// Core
import React from 'react';
import ReactDOM from 'react-dom';
// Test
import {act} from 'react-dom/test-utils';
import test from 'ava';
import sinon from 'sinon';
// I18n library
import i18njs from '@k14v/i18njs';
// Hook
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

const Consumer = (_) => {
  const i18n = useI18n();
  return (
    <p>{i18n.trls.__('Hello World')}</p>
  );
};

test.cb('it should throw a warning, when used a consumer without provider', (t) => {
  t.timeout(10000);
  t.plan(1);
  const i18n = i18njs({locales, locale: 'es'});
  i18n.subscribe(({type}) => {
    if (type === I18N_EVENTS.LOADED) {
      const warnSpy = sinon.spy(console, 'warn');
      const container = document.createElement('div');
      document.body.appendChild(container);
      act(() => {
        ReactDOM.render(
          <Consumer />,
          container
        );
      });
      t.true(warnSpy.calledOnce);
      warnSpy.restore();
      t.end();
    }
  });

});
