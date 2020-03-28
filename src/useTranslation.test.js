// Core
import React from 'react';
// Testing
import { render } from '@testing-library/react';
import { fetchI18n } from './testUtils';
// Components
import I18nProvider from './I18nProvider';
import useTranslation from './useTranslation';


const Consumer = ({word = 'Teléfono'}) => {
  const trls = useTranslation();
  return <span>{trls.__(word)}</span>;
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
