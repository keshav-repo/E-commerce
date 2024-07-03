module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ecomstore-dev-data.s3.us-east-2.amazonaws.com',
                pathname: '/product/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/api/:path*'
            }
        ]
    }
};
