// Core
import React from 'react';
// Testing
import { render } from '@testing-library/react';
import { fetchI18n, Consumer } from './testUtils';
// Components
import I18nProvider from './I18nProvider';


describe('I18nProvider', () => {
  it('render without errors', async () => {
    const i18n = await fetchI18n();
    render(<I18nProvider i18n={i18n}><Consumer /></I18nProvider>);
  });

  it('translates correctly', async () => {
    const i18n = await fetchI18n();
    const { getByText } = render(<I18nProvider i18n={i18n}><Consumer word="Teléfono" /></I18nProvider>);
    expect(getByText('Phone')).toBeInTheDocument();
  });

  it('updates correctly after setLocale', async () => {
    const i18n = await fetchI18n();
    const { getByText, rerender } = render(<I18nProvider i18n={i18n}><Consumer word="Teléfono" /></I18nProvider>);
    expect(getByText('Phone')).toBeInTheDocument();
    await i18n.setLocale('de');
    rerender(<I18nProvider i18n={i18n}><Consumer word="Teléfono" /></I18nProvider>);
    expect(getByText('Telefon')).toBeInTheDocument();
  });
});
