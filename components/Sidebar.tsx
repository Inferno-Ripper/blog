import React, { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import { AiFillHome } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Sidebar: any = () => {
	const { theme, setTheme } = useTheme();
	const [isMounted, setisMounted] = useState(false);

	const router = useRouter();

	// When mounted on client, now we can show the UI
	useEffect(() => setisMounted(true), []);

	const toggleTheme = (): void => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	if (!isMounted) return;

	return (
		<div className='fixed top-0 left-0 z-50 flex flex-col justify-center w-16 h-screen gap-16 border-r border-custom-white-border bg-custom-white-light dark:border-custom-dark-border dark:bg-custom-dark-light'>
			<Link href='/'>
				<div>
					<SidebarItem
						text='Home'
						icon={<AiFillHome />}
						active={router.pathname === '/' ? true : false}
					/>
				</div>
			</Link>

			<Link href='/bookmarks'>
				<div>
					<SidebarItem
						text='Bookmarks'
						icon={<BsBookmark />}
						active={router.pathname === '/bookmarks' ? true : false}
					/>
				</div>
			</Link>

			<Link href='/about'>
				<div>
					<SidebarItem
						text='About'
						icon={<AiOutlineInfoCircle />}
						active={router.pathname === '/about' ? true : false}
					/>
				</div>
			</Link>

			<div onClick={toggleTheme}>
				{theme === 'dark' ? (
					<SidebarItem text='Light Mode' icon={<BsSun />} active={false} />
				) : theme === 'light' ? (
					<SidebarItem text='Dark Mode' icon={<BsMoon />} active={false} />
				) : (
					<div>hi</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
