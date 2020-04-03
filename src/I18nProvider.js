// Core
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Context
import I18nContext from './I18nContext';
// Constants
import { I18N_EVENTS } from './constants';


const I18nProvider = ({i18n, children}) => {
  const [value, setI18n] = useState(i18n);

  useEffect(
    () => i18n.subscribe(
      ({type}) => {
        if (type === I18N_EVENTS.LOADED) setI18n(value);
      },
    ),
    [i18n],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
};

I18nProvider.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default I18nProvider;
