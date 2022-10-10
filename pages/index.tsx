import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import AuthorInfo from '../components/AuthorInfo';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import { sanityClient } from '../sanity';
import { IAuthor, IFeaturedPost, IPost } from '../typing';

interface IProps {
	featuredPostsSanity: [IFeaturedPost];
	allPostSanity: [IPost];
	allAuthorsSanity: [IAuthor];
}

const Home: NextPage<IProps> = ({
	featuredPostsSanity,
	allPostSanity,
	allAuthorsSanity,
}) => {
	return (
		<div className='w-full h-full min-h-screen overflow-x-hidden overflow-y-hidden min-w-screen bg-custom-white-dark dark:bg-custom-dark-full'>
			<Head>
				<title>Blog...</title>
				<link rel='icon' href='/assets/images/blog-logo.svg' />
			</Head>

			<div className='flex w-full h-full'>
				<Sidebar />
				<Header />

				<div className='mt-20 mb-5 ml-20 mr-8 flex h-full w-full flex-col gap-7 sm:mt-[85px] sm:ml-[85px] sm:mr-6 '>
					{/* featured posts banner */}
					{featuredPostsSanity && (
						<Banner featuredPostsSanity={featuredPostsSanity} />
					)}

					<div className='flex justify-between'>
						{/* all posts */}
						<div className='flex flex-col gap-6'>
							{allPostSanity.map((postData) => (
								<Post key={postData._id} postData={postData} />
							))}
						</div>

						<AuthorInfo allAuthorsSanity={allAuthorsSanity} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	// getting featured posts and all posts from sanity io
	const postsQuery = `
		{
			"featuredPosts": *[_type == "featured-post"] | order(_createdAt desc) {
				featuredPost-> {
				author-> {"bio": bio[0].children[0].text, image, name},
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
			},
		
			"allPosts": *[_type == "post"] | order(_createdAt desc) {
				author-> {"bio": bio[0].children[0].text, image, name},
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
			},
		
			"allAuthors": *[_type == "author"] | order(_createdAt asc) {
				_id,
				name,
				image,
				bio
			}
		}
	`;

	interface IPostsSanity {
		featuredPosts: [{ featuredPost: IFeaturedPost }];
		allPosts: IPost[];
		allAuthors: IAuthor[];
	}

	const postsSanity: IPostsSanity = await sanityClient.fetch(postsQuery);

	interface IFeaturedPostsSanity {
		featuredPost: IFeaturedPost;
	}

	// looping over featured posts and removing the featuredPost key from featured posts. changing the postsSanity structure to [{featuredPosts: {...}, allPosts: {...}}]
	const featuredPostsSanity = postsSanity.featuredPosts.map(
		({ featuredPost }: IFeaturedPostsSanity) => {
			return { ...featuredPost };
		}
	);

	// asigning all of the posts from sanity io to a variable allPostSanity
	const allPostSanity: IPost[] = postsSanity.allPosts;

	// asigning all of authors data from sanity io to a variable allauthorsSanity
	const allAuthorsSanity: IAuthor[] = postsSanity.allAuthors;

	return {
		props: {
			featuredPostsSanity,
			allPostSanity,
			allAuthorsSanity,
		},

		revalidate: 60,
	};
};
