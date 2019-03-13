// Core
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
// Utils
import memoizeOne from 'memoize-one';
// Context
import I18nContext from './I18nContext';
// Constants
import {I18N_EVENTS} from './constants';
// Util Hooks
import {useForceUpdate} from './utilHooks';


const I18nProvider = ({i18n, events, children}) => {

  const forceUpdate = useForceUpdate();

  const handleLocaleLoaded = memoizeOne((_) => {
    forceUpdate();
  });

  // Subscribe return the unsubscribe method
  useEffect(() => i18n.subscribe(({type, locale}) => type === events.LOADED && handleLocaleLoaded(locale)), [i18n]);

  return (
    <I18nContext.Provider value={{...i18n}}>{children}</I18nContext.Provider>
  );
};

I18nProvider.propTypes = {
  i18n: PropTypes.object.isRequired,
  events: PropTypes.object,
};

I18nProvider.defaultProps = {
  events: I18N_EVENTS,
};

export default I18nProvider;
