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
};
