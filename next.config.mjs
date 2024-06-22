/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "klbtheme.com",
        },
        {
          protocol: "https",
          hostname: "i.ibb.co",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "imgbb.com",
        },
        {
          protocol: "https",
          hostname: "ibb.co",
        },
      ],
    },
  };
  
  export default nextConfig;