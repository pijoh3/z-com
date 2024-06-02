/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: [
    {
      source: "/upload/:slug",
      destination: "http://localhost:9090/upload/:slug",
    },
  ],
};

export default nextConfig;
