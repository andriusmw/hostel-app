/** @type {import('next').NextConfig} */
const nextConfig = {
    //Permitir los dominios externos para imágenes.
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ichef.bbci.co.uk',
            pathname: '**', 
          },
        ],
      },


};

export default nextConfig;
