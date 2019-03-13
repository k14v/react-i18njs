// Core
import {useContext} from 'react';
// Context
import I18nContext from './I18nContext';


const useI18n = () => useContext(I18nContext);

export default useI18n;
