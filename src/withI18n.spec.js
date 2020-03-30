// Core
import React, { useRef } from 'react';
// Testing
import test from 'ava';
import { render, cleanup } from '@testing-library/react';
import sinon from 'sinon';
import { fetchI18n } from './testUtils';
// Components
import I18nProvider from './I18nProvider';
// HOC
import withI18n from './withI18n';


test.afterEach(cleanup);

const BaseComponent = ({trls, word = 'Perro'}) => <span>{trls.__(word)}</span>;

const WrappedComponent = withI18n()(BaseComponent);

test('render without errors', (t) => {
  const warnStub = sinon.stub(console, 'warn').callsFake(() => {});
  render(<WrappedComponent />);
  t.pass();
  warnStub.restore();
});

test('render with a provider', async (t) => {
  const i18n = await fetchI18n();
  render(<I18nProvider i18n={i18n}><WrappedComponent /></I18nProvider>);
  t.pass();
});

test('translates correctly', async (t) => {
  const i18n = await fetchI18n();
  const { getByText } = render(<I18nProvider i18n={i18n}><WrappedComponent word="Teléfono" /></I18nProvider>);
  t.truthy(getByText('Phone'));
});

test('forwards the ref', async (t) => {
  const INITIAL_VALUE = 'Popeye';
  const Inner = React.forwardRef((props, ref) => {
    t.is(ref.current, INITIAL_VALUE);
    return (
      <button ref={ref} {...props} type="button" />
    );
  });
  const Wrapper = withI18n()(Inner);
  const Provider = ({i18n}) => {
    const ref = useRef(INITIAL_VALUE);
    return (
      <I18nProvider i18n={i18n}>
        <Wrapper ref={ref} />
      </I18nProvider>
    );
  };

  const i18n = await fetchI18n();

  render(<Provider i18n={i18n} />);
});
