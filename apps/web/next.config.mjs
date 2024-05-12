/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@tasks-center/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',}
    ],
  },
};

export default nextConfig;
