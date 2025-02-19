/** @type {import('next').NextConfig} */
import webpack from 'webpack';

const nextConfig = {
  output: "export",
  distDir: "./dist",
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      }),
    );
    return config;
  }
};

export default nextConfig;
