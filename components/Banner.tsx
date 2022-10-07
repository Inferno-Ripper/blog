import React, { useEffect, useRef, useState } from 'react';
import { urlFor } from '../sanity';
import { IFeaturedPost } from '../typing';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import { BiChevronRight, BiDetail } from 'react-icons/bi';
import moment from 'moment';
import Link from 'next/link';

interface IProps {
	featuredPostsSanity: [IFeaturedPost];
}

const Banner = ({ featuredPostsSanity }: IProps) => {
	const [selected, setSelected] = useState<number>(0);
	const [featuredPosts, setFeaturedPosts] =
		useState<IFeaturedPost[]>(featuredPostsSanity);

	const nextBtnRef = useRef(null);

	const previous = () => {
		if (selected !== 0) {
			setSelected((prev) => prev - 1);
		} else if (selected === 0) {
			setSelected(featuredPosts.length - 1);
		}
	};

	const next = () => {
		if (selected === featuredPosts.length - 1) {
			setSelected(0);
		} else {
			setSelected((prev) => prev + 1);
		}
	};

	console.log(featuredPosts[selected].slug?.current);

	return (
		<div className='relative z-10 w-full m-20 mr-3 text-white transition-all duration-500 bg-transparent bg-center bg-no-repeat bg-cover rounded-lg group h-80 '>
			<div
				className='absolute inset-0 z-0 transition-all duration-500 bg-center bg-no-repeat bg-cover border rounded-lg brightness-80 border-custom-white-border group-hover:brightness-50 dark:border-custom-dark-border'
				style={{
					backgroundImage: `url(${urlFor(
						featuredPosts[selected]?.mainImage
					)?.url()})`,
				}}
			></div>

			{/* previous button */}
			<p
				onClick={previous}
				className='absolute text-3xl cursor-pointer left-2 top-1/2 text-zinc-700 group-hover:text-white hover:text-blue-500'
			>
				<FaChevronCircleLeft className='transition-all duration-300 rounded-full hover:text-blue-500' />
			</p>

			{/* next button */}
			<p
				ref={nextBtnRef}
				onClick={next}
				className='absolute text-3xl cursor-pointer right-2 top-1/2 text-zinc-700 group-hover:text-white '
			>
				<FaChevronCircleRight className='transition-all duration-300 hover:text-blue-500' />
			</p>

			{/* dots */}
			<div className='absolute bottom-0 flex items-end justify-center w-full gap-2 text-3xl text-zinc-700 group-hover:text-white'>
				{featuredPosts?.map((featuredPost, index) => (
					<GoPrimitiveDot
						key={featuredPost._id}
						onClick={() => setSelected(index)}
						className={`${
							selected === index ? 'text-blue-500' : ''
						} cursor-pointer transition-all duration-300 hover:text-blue-600`}
					/>
				))}
			</div>

			{/* post's details icon */}
			<p className='absolute w-12 h-12 text-3xl peer left-2 top-1 sm:hidden '>
				<BiDetail />
			</p>

			<div className='absolute left-11 top-1 z-10 hidden h-[90%] w-80 flex-col justify-between gap-2 truncate rounded-lg  border border-custom-white-border bg-custom-white-light p-4 text-black  duration-300 group-hover:opacity-100 peer-hover:flex hover:flex  dark:border-custom-dark-border dark:bg-custom-dark-light dark:text-white sm:left-20 sm:top-2 sm:flex sm:w-96 sm:opacity-80'>
				<div className='flex justify-between '>
					<div className='flex items-center gap-2'>
						{/* author's image */}
						<img
							className='w-8 h-8 rounded-full sm:h-10 sm:w-10'
							src={urlFor(featuredPosts[selected]?.author?.image).url()}
							alt=''
						/>

						{/* author's name */}
						<p className='font-medium '>
							{featuredPosts[selected]?.author?.name}
						</p>
					</div>

					{/* post created at */}
					<p className='text-xs font-semibold sm:text-sm'>
						Posted On{' '}
						{moment(featuredPosts[selected]?._createdAt).format('MMM Do YY')}
					</p>
				</div>

				{/* post title */}
				<h1 className='w-full px-2 text-xl font-semibold break-words truncate whitespace-normal max-h-16 sm:text-2xl'>
					{featuredPosts[selected]?.title}
				</h1>

				{/* post description */}
				<p className='flex-1 truncate whitespace-normal break-words pl-2 text-sm sm:text-[16px] '>
					{featuredPosts[selected]?.description}
				</p>

				{/* post categories */}
				<div
					className={`${
						featuredPosts[selected]?.categories?.length! > 2
							? 'justify-around'
							: 'gap-6'
					} flex pt-2 sm:pt-3`}
				>
					{featuredPosts[selected].categories
						?.slice(0, 3)
						?.map(({ _id, title }) => (
							<p
								key={_id}
								className='px-3 py-1 font-medium text-white transition-all duration-300 bg-gray-700 cursor-pointer rounded-xl hover:bg-gray-800 sm:px-4'
							>
								{title}
							</p>
						))}
				</div>
			</div>

			<Link href={featuredPosts[selected]?.slug?.current!}>
				<button className='absolute flex items-center justify-center px-4 py-1 font-semibold tracking-wider transition-all duration-500 bg-blue-500 rounded-lg cursor-pointer read-btn bottom-10 right-5 hover:bg-blue-600'>
					Read
					<span className='text-2xl transition-all duration-300 arrow'>
						<BiChevronRight />
					</span>
				</button>
			</Link>
		</div>
	);
};

export default Banner;
