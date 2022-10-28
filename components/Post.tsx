import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { urlFor } from '../sanity';
import { IPost } from '../typing';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
	postData: IPost;
}

const Post = ({ postData }: IProps) => {
	return (
		<div className='custom-background-color-and-border  group flex w-96 flex-col gap-2 overflow-hidden rounded-lg border lg:h-60 lg:w-[850px] lg:flex-row'>
			{/* post image */}

			<Link href={postData?.slug?.current!}>
				<img
					src={urlFor(postData?.mainImage).url()}
					className='flex h-56 w-96 items-center rounded-t-lg bg-black object-cover object-center transition-all duration-200 group-hover:scale-105 lg:h-full lg:w-80 lg:rounded-tr-none lg:rounded-bl-lg'
					alt=''
				/>
			</Link>

			<div className='space-y-2 p-2'>
				{/* post categories small screen size*/}

				<div className='flex h-auto w-full flex-wrap items-center justify-center gap-4 gap-x-6 lg:hidden '>
					{postData.categories?.slice(0, 4)?.map(({ _id, title }) => (
						<button
							key={uuidv4()}
							className='cursor-pointer rounded-lg bg-gray-700 px-3 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-800 '
						>
							{title}
						</button>
					))}
				</div>

				{/* post categories large screen size*/}
				<div className='hidden h-auto w-full flex-wrap gap-4 lg:flex '>
					{postData.categories?.slice(0, 3)?.map(({ _id, title }) => (
						<button
							key={uuidv4()}
							className='cursor-pointer rounded-lg bg-gray-700 px-3 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-800 '
						>
							{title}
						</button>
					))}
				</div>

				{/* post title */}
				<Link href={postData?.slug?.current!}>
					<h1 className='w-full cursor-pointer  truncate break-words text-xl font-semibold lg:w-[500px]'>
						{postData?.title}
					</h1>
				</Link>

				{/* post description */}
				<Link href={postData?.slug?.current!}>
					<p className='h-20 w-full cursor-pointer truncate whitespace-normal break-words  text-sm lg:w-[500px]'>
						{postData?.description?.trim()}
					</p>
				</Link>

				{/* post author */}
				<div className='relative flex items-center gap-4 p-2 lg:p-0'>
					{/* post author image */}
					<img
						src={urlFor(postData?.author?.image).url()}
						alt=''
						className='h-10 rounded-full'
					/>

					<div className=''>
						{/* post author's name */}
						<p className='font-medium '>{postData?.author?.name}</p>

						{/* post created at */}
						<p className='text-xs font-medium'>
							Posted On {moment(postData?._createdAt).format('MMM Do YY')}
						</p>
					</div>

					{/* read button */}
					<Link href={postData?.slug?.current!}>
						<button className='read-btn absolute right-0 flex cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-4 py-1 font-semibold tracking-wider text-white transition-all duration-500 hover:bg-blue-600'>
							Read
							<span className='arrow text-2xl transition-all duration-300'>
								<BiChevronRight />
							</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Post;
