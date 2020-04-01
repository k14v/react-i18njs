// Core
import React from 'react';
// Testing
import test from 'ava';
import render from '@test/customRender';
import { fetchI18n } from '@test/testUtils';
// Components
import I18nProvider from './I18nProvider';
import useI18n from './useI18n';


const Consumer = ({word = 'Teléfono'}) => {
  const i18n = useI18n();
  return <span>{i18n.trls.__(word)}</span>;
};

test('render without errors', async (t) => {
  const i18n = await fetchI18n();
  render(<I18nProvider i18n={i18n}><Consumer /></I18nProvider>);
  t.pass();
});

test('translates correctly', async (t) => {
  const i18n = await fetchI18n();
  const { getByText } = render(<I18nProvider i18n={i18n}><Consumer word="Perro" /></I18nProvider>);
  t.truthy(getByText('Dog'));
});
