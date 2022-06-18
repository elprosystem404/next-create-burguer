/* @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	//basePath: "/",
	images: {
		// loader: 'imgix',
		// path: './',
		domains: [
			"descontoshoje.com.br",
			"descontoshoje.com.br/api/createBurger/upload/",
		],
	},
	// async redirects() {
	//   return [
	//     {
	//       source: '/setting',
	//       destination: '/setting',
	//       basePath: false,
	//       permanent: false,
	//     }
	//   ]
	// },
	// async rewrites() {
	//   return [
	//     {
	//       source: '/setting',
	//       destination: '/setting'
	//     }
	//   ]
	// }
};

export default nextConfig;
