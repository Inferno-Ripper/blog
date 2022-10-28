import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
	return (
		<ThemeProvider attribute='class' defaultTheme='dark'>
			<SessionProvider session={session}>
				<NextNProgress color='#0EA5E9' options={{ showSpinner: false }} />
				<Component {...pageProps} />
			</SessionProvider>
		</ThemeProvider>
	);
}

export default MyApp;
