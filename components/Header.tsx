import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { RiAccountCircleLine } from 'react-icons/ri';

const Header: any = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) return;

	return (
		<div className='fixed flex items-center justify-between w-screen h-16 gap-16 px-4 border-b border-custom-white-border bg-custom-white-light dark:border-custom-dark-border dark:bg-custom-dark-light'>
			<Link href='/home'>
				{theme === 'dark' ? (
					<img
						src='/assets/images/blog-logo-white.svg'
						alt=''
						className='object-contain w-20 cursor-pointer'
					/>
				) : (
					<img
						src='/assets/images/blog-logo.svg'
						alt=''
						className='object-contain w-20 cursor-pointer'
					/>
				)}
			</Link>

			<div className='flex items-center gap-5 group '>
				<p className='text-xl font-medium text-blue-500 transition-all duration-300 cursor-pointer hover:text-blue-600'>
					Sign In
				</p>
				<RiAccountCircleLine className='text-4xl transition-all duration-300 cursor-pointer group-hover:scale-110' />
			</div>
		</div>
	);
};

export default Header;
