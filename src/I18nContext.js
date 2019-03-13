// Core
import React from 'react';


const warningThereIsNoProvider = () => console.warn('I18nContext - Warning! there is no I18nProvider for I18nContext');

export default React.createContext({
  subscribe: warningThereIsNoProvider,
  trls: {
    __: warningThereIsNoProvider,
  },
});
