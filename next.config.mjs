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
      ],
    },
  };
  
  export default nextConfig;