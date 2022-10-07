import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { sanityClient } from '../sanity';
import { IFeaturedPost } from '../typing';

interface IProps {
	featuredPostsSanity: [IFeaturedPost];
}

const Home: NextPage<IProps> = ({ featuredPostsSanity }) => {
	// console.log(featuredPostsSanity);
	// console.log(featuredPostsSanity[0].featuredPost);

	return (
		<div className='min-w-screen h-full min-h-screen w-full overflow-x-hidden overflow-y-hidden bg-custom-white-dark dark:bg-custom-dark-full'>
			<Head>
				<title>Blog...</title>
				<link rel='icon' href='/assets/images/blog-logo.svg' />
			</Head>

			<div className='flex h-full w-full'>
				<Sidebar />
				<Header />

				{featuredPostsSanity && (
					<Banner featuredPostsSanity={featuredPostsSanity} />
				)}
			</div>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const featuredPostsQuery = `*[_type == "featured-post"] | order(_createdAt desc) {
		featuredPost-> {
		author-> {bio, image, name},
		body,
		categories[]->{_id, title, description},
		imagesGallery,
		mainImage,
		slug{current},
		title,
		description,
	 _createdAt,
	 _updatedAt,
	 _id
	 }
	} 
		`;

	let featuredPostsSanity = await sanityClient.fetch(featuredPostsQuery);

	interface IFeaturedPostsSanity {
		featuredPost: IFeaturedPost;
	}

	featuredPostsSanity = featuredPostsSanity.map(
		({ featuredPost }: IFeaturedPostsSanity) => {
			return { ...featuredPost };
		}
	);

	return {
		props: {
			featuredPostsSanity,
		},

		revalidate: 60,
	};
};
