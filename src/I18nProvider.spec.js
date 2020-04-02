// Core
import React from 'react';
// Testing
import test from 'ava';
import render from '@test/customRender';
import { fetchI18n, Consumer } from '@test/testUtils';
// Components
import I18nProvider from './I18nProvider';


test('render without errors', async (t) => {
  const i18n = await fetchI18n();
  render(<I18nProvider i18n={i18n}><Consumer /></I18nProvider>);
  t.pass();
});

test('translates correctly', async (t) => {
  const i18n = await fetchI18n();
  const { getByText } = render(<I18nProvider i18n={i18n}><Consumer word="Teléfono" /></I18nProvider>);
  t.truthy(getByText('Phone'));
});

test('updates correctly after setLocale', async (t) => {
  const i18n = await fetchI18n();
  const { getByText, rerender } = render(<I18nProvider i18n={i18n}><Consumer word="Teléfono" /></I18nProvider>);
  t.truthy(getByText('Phone'));
  await i18n.setLocale('de');
  rerender(<I18nProvider i18n={i18n}><Consumer word="Teléfono" /></I18nProvider>);
  t.truthy(getByText('Telefon'));
});
