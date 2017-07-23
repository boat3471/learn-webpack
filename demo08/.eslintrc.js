module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    rules: {
        "react/display-name": 1, // 配置 react 规则, 其中 react/ 为 plugins 中开启的插件名
        "react/jsx-boolean-value": 1
    },
    parserOptions: {
        ecmaFeatures: {
            "jsx": true, //开启 ESLint JSX 支持（ESLint 内置选项）
        }
    },
    parser: 'babel-eslint',
    plugins: [
        'react', // 开启 eslint-plugin-react 插件, 其中 eslint-plugin- 可以省略
    ],
    globals: {

    }
};