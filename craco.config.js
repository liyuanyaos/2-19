// module.exports = {
//     devServer: {
//         proxy: {
//             '/': {
//                 target: 'http://47.95.13.131:8081',
//                 changeOrigin: true,
//                 pathRewrite: {
//                   '^/': ''
//                 }
//             }
//         },
//     },
//     // tailwindcss 的相关配置，如果没有使用到可以去掉
// }

module.exports = {
    // 代理接口
    devServer: {
        proxy: {
            '/api': {
                target: 'http://47.95.13.131:8081',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        },
    },
};
