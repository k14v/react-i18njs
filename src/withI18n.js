// Core
import React from 'react';
// Utils
import hoistStatics from 'hoist-non-react-statics';
// Hooks
import useI18n from './useI18n';


const addExtraProps = (mapI18nToProps = i18n => ({trls: i18n.trls}), props, i18n, ref) => ({
  ref,
  ...props,
  ...mapI18nToProps(i18n),
});

export default mapI18nToProps => (Component) => {
  const WrapperComponent = React.forwardRef((props, ref) => {
    const i18n = useI18n();
    return React.createElement(Component, addExtraProps(mapI18nToProps, props, i18n, ref));
  });
  WrapperComponent.displayName = `withI18n(${Component.displayName || Component.name})`;
  WrapperComponent.WrappedComponent = Component;
  return hoistStatics(WrapperComponent, Component);
};
