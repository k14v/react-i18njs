// Core
import React, { useContext } from 'react';
// Utils
import i18njs from '@k14v/i18njs';
// Context
import I18nContext from '../src/I18nContext';


export const I18N_DATA = {
  locale: 'en',
  locales: {
    es: {
      'esto es una prueba': 'Esto es una prueba',
      Teléfono: 'Teléfono',
      Perro: 'Perro',
    },
    en: {
      'esto es una prueba': 'This is a test',
      Teléfono: 'Phone',
      Perro: 'Dog',
    },
    de: {
      'esto es una prueba': 'Das ist ein Test',
      Teléfono: 'Telefon',
      Perro: 'Hund',
    },
  },
};

export function fetchI18n() {
  return new Promise((resolve) => {
    const i18n = i18njs(I18N_DATA);
    i18n.on('loaded', () => resolve(i18n));
  });
}

export const Consumer = ({word = 'Perro'}) => {
  const i18n = useContext(I18nContext);
  return (<span>{i18n.trls.__(word)}</span>);
};
