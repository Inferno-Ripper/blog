import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute='class' defaultTheme='dark'>
			<NextNProgress color='#297BE5' options={{ showSpinner: false }} />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
