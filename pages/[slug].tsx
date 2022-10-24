import moment from 'moment';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { sanityClient, SanityImage, urlFor } from '../sanity';
import { IPost } from '../typing';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

const Post = (post: IPost) => {
	const [displayGalleryImage, setDisplayGalleryImage] = useState(
		post?.imagesGallery && post?.imagesGallery[0]
	);

	const portableTextComponents = {
		block: {
			// Ex. 2: rendering custom styles
			h1: ({ children }: any) => (
				<h1 className='my-4 text-4xl font-medium'>{children}</h1>
			),

			h2: ({ children }: any) => (
				<h2 className='my-4 text-3xl font-medium'>{children}</h2>
			),

			h3: ({ children }: any) => (
				<h3 className='my-4 text-2xl font-medium'>{children}</h3>
			),

			blockquote: ({ children }: any) => (
				<blockquote className='my-4 rounded-tl-[4px] rounded-bl-[4px] border-l-4 border-blue-500 pl-2 font-semibold '>
					{children}
				</blockquote>
			),
		},

		marks: {
			link: ({ children, value }: any) => {
				const rel: any = !value?.href?.startsWith('/')
					? 'noreferrer noopener'
					: undefined;
				return (
					<a
						href={value.href}
						rel={rel}
						className='text-blue-600 cursor-pointer hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-500'
					>
						{children}
					</a>
				);
			},
		},

		listItem: {
			// Ex. 1: customizing common list types
			bullet: ({ children }: any) => (
				<li className='ml-6 font-medium list-disc'>{children}</li>
			),
		},

		types: {
			image: ({ value }: any) => {
				return <SanityImage {...value} />;
			},
		},
	};

	return (
		<div className='min-h-screen space-y-2 overflow-x-hidden min-w-screen bg-custom-white-dark dark:bg-custom-dark-full'>
			<Head>
				<title>{post.title}</title>
				<link rel='icon' href='/assets/images/b.svg' />
			</Head>

			<div>
				<Header />
				<Sidebar />

				<img
					src={urlFor(post.mainImage).url()}
					alt=''
					className='object-cover w-full mt-16 ml-16 transition-all duration-500 bg-transparent cursor-pointer h-52 hover:h-96'
				/>
			</div>

			<div className='flex justify-center w-full min-h-screen ml-8 text-black dark:text-white'>
				<div className='w-4/5 p-2 pb-10 space-y-4 break-all whitespace-normal md:w-1/2'>
					{/* post title */}
					<h1 className='text-4xl font-semibold '>{post?.title}</h1>

					{/* post description */}
					<h3 className='text-lg'>{post.description}</h3>

					<div className='flex items-center gap-2'>
						{/* author image */}
						<img
							src={urlFor(post.author?.image).url()}
							alt=''
							className='w-12 h-12 rounded-full'
						/>

						{/* post created at and updated at */}
						<div>
							<p>
								Blog Posted By{' '}
								<span className='font-semibold'>{post.author?.name}</span> On{' '}
								{moment(post._createdAt).format('MMMM Do YYYY, h:mm a')}
							</p>
							<p className='text-xs'>
								Last Updated On{' '}
								{moment(post._updatedAt).format('MMMM Do YYYY, h:mm a')}
							</p>
						</div>
					</div>

					<div className='max-w-full space-y-10 '>
						<PortableText
							value={post.body}
							components={portableTextComponents}
						/>

						{/* images gallery */}
						<div className='space-y-4 '>
							<img
								src={urlFor(displayGalleryImage)?.url()}
								alt=''
								className='object-contain w-full rounded-lg cursor-pointer'
							/>

							<div className='flex gap-5 overflow-y-hidden rounded-lg cursor-pointer scrollbar-thin scrollbar-thumb-zinc-600 dark:scrollbar-thumb-zinc-700'>
								{post.imagesGallery?.map((image) => (
									<img
										src={urlFor(image)?.url()}
										alt=''
										className='h-32 transition-all duration-500 rounded-lg hover:brightness-50'
										onClick={() => setDisplayGalleryImage(image)}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;

export const getStaticPaths = async () => {
	const query = `
 *[_type == "post"]{
    _id,
    slug { 
      current 
    }
  }
  `;

	interface IPostPaths {
		_id: string;
		slug: { current: string };
	}

	const posts: IPostPaths[] = await sanityClient.fetch(query);

	console.log(posts);

	const paths = posts?.map((post: IPostPaths) => ({
		params: {
			slug: post.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `
    *[_type == "post" && slug.current == $slug][0]{
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
    _id,
    }
  `;

	const post = await sanityClient.fetch(query, {
		slug: params?.slug,
	});

	if (!post) {
		return {
			notFound: true,
		};
	}
	return {
		props: post,
		revalidate: 60, // after 60 seconds it'll update the old cached version
	};
};
