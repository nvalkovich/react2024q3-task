import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';

export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export default wrapper.withRedux(App);
