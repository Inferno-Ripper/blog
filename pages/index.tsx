import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
	return (
		<div className='  min-w-screen h-full min-h-screen w-full dark:bg-custom-dark-full'>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<h1>hi</h1>
			<Link href='home'>home</Link>
		</div>
	);
};

export default Home;
