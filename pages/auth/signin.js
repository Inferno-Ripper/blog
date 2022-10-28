import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn({ providers }) {
	const {
		query: { callbackUrl },
	} = useRouter();
	return (
		<>
			{Object.values(providers).map((provider) => (
				<div
					key={provider?.name}
					className='min-w-screen flex min-h-screen items-center justify-center bg-custom-dark-full '
				>
					<div className='min-w-screen flex min-h-screen items-center justify-center bg-custom-dark-full '>
						<div
							onClick={() =>
								signIn(provider?.id, {
									callbackUrl,
								})
							}
							className='flex cursor-pointer items-center gap-2 rounded-lg bg-white py-3 px-6 text-xl font-semibold tracking-wider  text-black transition-all duration-300 hover:scale-105'
						>
							<img
								src='/assets/images/google-logo.png'
								alt=''
								className='h-8 w-8'
							/>
							<p>Sign in with {provider?.name}</p>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}
