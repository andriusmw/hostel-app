/** @type {import('next').NextConfig} */
const nextConfig = {
    // Permitir los dominios externos para imágenes.
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ichef.bbci.co.uk',
          pathname: '/**', 
        },
        {
          protocol: 'https',
          hostname: 'image.cnbcfm.com', 
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'i0.wp.com', 
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'media.npr.org', 
          pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: '**',
            pathname: '/**',
          }
       
      ],
    },
  };
  
  export default nextConfig;