import moment from 'moment';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { sanityClient, SanityImage, urlFor } from '../sanity';
import { IPost } from '../typing';
import { PortableText } from '@portabletext/react';
import { useSession, signIn } from 'next-auth/react';

const Post = (post: IPost) => {
	const [newComment, setNewComment] = useState('');
	const [displayGalleryImage, setDisplayGalleryImage] = useState(
		post?.imagesGallery && post?.imagesGallery[0]
	);
	const { data: session } = useSession();
	const user = session?.user;

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
						className='cursor-pointer text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-500'
					>
						{children}
					</a>
				);
			},
		},

		listItem: {
			// Ex. 1: customizing common list types
			bullet: ({ children }: any) => (
				<li className='ml-6 list-disc font-medium'>{children}</li>
			),
		},

		types: {
			image: ({ value }: any) => {
				return <SanityImage {...value} />;
			},
		},
	};

	const postComment = (e: any) => {
		e.preventDefault();

		const data = {
			comment: newComment,
			postId: post?._id,
		};

		fetch('api/addComment', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		setNewComment('');
	};

	return (
		<div className='min-w-screen min-h-screen space-y-2 overflow-x-hidden bg-custom-white-dark dark:bg-custom-dark-full'>
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
					className='mt-16 ml-16 h-52 w-full cursor-pointer bg-transparent object-cover transition-all duration-500 hover:h-96'
				/>
			</div>

			<div className='ml-8 flex min-h-screen w-full justify-center text-black dark:text-white'>
				<div className='w-4/5 space-y-4 whitespace-normal break-all p-2 pb-10 md:w-1/2'>
					{/* post title */}
					<h1 className='text-4xl font-semibold '>{post?.title}</h1>

					{/* post description */}
					<h3 className='text-lg'>{post.description}</h3>

					<div className='flex items-center gap-2'>
						{/* author image */}
						<img
							src={urlFor(post.author?.image).url()}
							alt=''
							className='h-12 w-12 rounded-full'
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
							{displayGalleryImage && (
								<img
									src={urlFor(displayGalleryImage)?.url()}
									alt=''
									className='w-full cursor-pointer rounded-lg object-contain'
								/>
							)}

							<div className='flex cursor-pointer gap-5 overflow-y-hidden rounded-lg scrollbar-thin scrollbar-thumb-zinc-600 dark:scrollbar-thumb-zinc-700'>
								{post.imagesGallery?.map((image) => (
									<img
										src={urlFor(image)?.url()}
										alt=''
										className='h-32 rounded-lg transition-all duration-500 hover:brightness-50'
										onMouseEnter={() => setDisplayGalleryImage(image)}
									/>
								))}
							</div>
						</div>
					</div>

					<div className='py-10 '>
						<hr className='mx-20 rounded-md border-2 border-blue-500' />
					</div>

					{/* comment section*/}
					{user ? (
						<div className='flex flex-col gap-5'>
							<div className='border-b border-custom-white-border pb-4 dark:border-custom-dark-border'>
								<p className='text-md text-zinc-600 dark:text-zinc-400'>
									Enjoyed This Article?
								</p>
								<h1 className='text-3xl font-semibold'>
									Leave A Comment Below!
								</h1>
							</div>

							{/* comment */}
							<form onClick={postComment} className='space-y-8'>
								<div className='space-y-2'>
									<h1 className='text-2xl font-semibold '>Comment</h1>
									<textarea
										value={newComment}
										onChange={(e) => setNewComment(e.target.value)}
										placeholder='Type Your Comment Here'
										rows={8}
										maxLength={1000}
										className='w-full resize-none rounded-lg border-2 border-custom-white-border bg-transparent p-2 shadow-sm outline-none transition-all duration-300 scrollbar-none placeholder:text-zinc-600 focus:border-blue-500 dark:border-custom-dark-border dark:shadow-zinc-800 dark:placeholder:text-zinc-400 dark:focus:border-blue-500'
									></textarea>
								</div>

								<button
									disabled={newComment.length > 0 ? false : true}
									type='submit'
									className='w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-lg font-semibold tracking-wide text-white transition-all duration-300 disabled:cursor-not-allowed disabled:bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-600'
								>
									Submit
								</button>
							</form>
						</div>
					) : (
						<div className='flex w-full justify-center  '>
							<button
								onClick={() => signIn()}
								className='rounded-lg bg-white py-2 px-6 text-lg font-semibold tracking-wider text-black transition-all  duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white'
							>
								sign in to comment
							</button>
						</div>
					)}
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
