import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
	return (
		<div className='w-full h-full min-h-screen min-w-screen bg-custom-white-dark dark:bg-custom-dark-full'>
			<Head>
				<title>Blog</title>
				<link rel='icon' href='/assets/images/blog-logo.svg' />
			</Head>

			<Sidebar />
			<Header />
		</div>
	);
};

export default Home;
