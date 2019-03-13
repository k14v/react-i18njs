// Core
import {useState} from 'react';


export const useForceUpdate = () => {
  const [, setState] = useState(true);
  return () => setState(value => !value);
};
