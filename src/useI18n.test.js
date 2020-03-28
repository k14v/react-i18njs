// Core
import React from 'react';
// Testing
import { render } from '@testing-library/react';
import { fetchI18n } from './testUtils';
// Components
import I18nProvider from './I18nProvider';
import useI18n from './useI18n';


const Consumer = ({word = 'Teléfono'}) => {
  const i18n = useI18n();
  return <span>{i18n.trls.__(word)}</span>;
};

describe('useI18n', () => {

  it('render without errors', async () => {
    const i18n = await fetchI18n();
    render(<I18nProvider i18n={i18n}><Consumer /></I18nProvider>);
  });

  it('translates correctly', async () => {
    const i18n = await fetchI18n();
    render(<I18nProvider i18n={i18n}><Consumer /></I18nProvider>);
  });

});
