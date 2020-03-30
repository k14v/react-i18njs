// Core
import React, { useRef } from 'react';
// Testing
import { render } from '@testing-library/react';
import { fetchI18n } from './testUtils';
// Components
import I18nProvider from './I18nProvider';
// HOC
import withI18n from './withI18n';


const BaseComponent = ({trls, word = 'Perro'}) => <span>{trls.__(word)}</span>;

const WrappedComponent = withI18n()(BaseComponent);

describe('withI18n', () => {

  it('render without errors', () => {
    jest.spyOn(console, 'warn');
    console.warn.mockImplementation(() => {});
    render(<WrappedComponent />);
    console.warn.mockRestore();
  });

  it('render with a provider', async () => {
    const i18n = await fetchI18n();
    render(<I18nProvider i18n={i18n}><WrappedComponent /></I18nProvider>);
  });

  it.skip('translates correctly', async () => {
    const i18n = fetchI18n();
    const { getByText } = render(<I18nProvider i18n={i18n}><WrappedComponent word="Teléfono" /></I18nProvider>);
    expect(getByText('Phone')).toBeInTheDocument();
  });

  it('forwards the ref', async () => {
    const INITIAL_VALUE = 'Popeye';
    const Inner = React.forwardRef((props, ref) => {
      expect(ref.current).toBe(INITIAL_VALUE);
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

});
