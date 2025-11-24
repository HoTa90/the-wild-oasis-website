/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
 
  images: {
    remotePatterns: [new URL('https://tqhtjuzacanlvgwhnwlb.supabase.co/**')],
  },

};

export default nextConfig;
