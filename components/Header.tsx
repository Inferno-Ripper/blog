import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header: any = () => {
	const [mounted, setMounted] = useState(false);
	const { data: session } = useSession();
	const user = session?.user;

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) return;

	return (
		<div className='fixed top-0 left-0 z-50 flex items-center justify-between w-screen h-16 gap-16 px-4 pr-6 border-b custom-background-color-and-border'>
			<Link href='/'>
				<img
					src='blog-logo-blue.svg'
					alt=''
					className='object-contain w-20 cursor-pointer'
				/>
			</Link>

			<div className='flex items-center gap-5 group'>
				{user ? (
					<p
						onClick={() => signOut()}
						className='text-xl font-medium text-blue-500 transition-all duration-300 cursor-pointer hover:text-blue-600'
					>
						Sign Out
					</p>
				) : (
					<p
						onClick={() => signIn()}
						className='text-xl font-medium text-blue-500 transition-all duration-300 cursor-pointer hover:text-blue-600'
					>
						Sign In
					</p>
				)}
				{user ? (
					<img
						src={user?.image!}
						alt=''
						className='h-10 transition-all duration-300 rounded-full cursor-pointer peer group-hover:scale-110'
					/>
				) : (
					<RiAccountCircleLine className='text-4xl transition-all duration-300 cursor-pointer group-hover:scale-110' />
				)}

				<div className='absolute hidden w-20 h-20 peer top-6 -right-0 peer-hover:block hover:block'></div>

				{/* dropdown */}
				{user && (
					<div className='absolute hidden p-3 space-y-2 rounded-lg custom-background-color-and-border top-20 right-7 whitespace-nowrap peer-hover:block hover:block'>
						<p className='px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700'>
							{user?.name}
						</p>
						<p className='px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700'>
							{user?.email}
						</p>

						<p
							onClick={() => signOut()}
							className='px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700'
						>
							Sign Out
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
