// Testing
import { render } from '@testing-library/react';


const customRender = (node, {
  container = document.createElement('div'),
  ...rest
} = {}) => render(node, {
  container,
  ...rest,
});

export default customRender;
