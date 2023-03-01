const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


var pckg = require('./package.json');

module.exports = (env) => {
    // настройка объекта config приложения
    let goal = env.goal;
    let isMob = env.isMob;
    let config = {
        buildMode: goal === "local" ? "" : goal,

        cordovaPackageName: "com.test.indexdb",
        packageVersion: pckg.version,
        packageName: pckg.name,
        applicationName: "testIndexDb",
        localStoragePrefix: "testIndexDb",
        allowedWebViewMajorVersion: 60,


        apiUrl: "",

        apiUrlDev: "",

        apiUrlIndexMob: "",
        baseNameIndexMob: "",
    };
    const capitalize = (s) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };
    let baseName = config["baseName" + capitalize(goal)];
    if (typeof baseName === "undefined") {
        baseName = "";
    }
    let filename =
        goal === "dev" || goal === "local"
            ? "index_bundle.js"
            : "[name].[contenthash].js";

    // остальные настройки
    return {
        devtool: 'inline-source-map',
        entry: {
            main: ["./src/index.jsx"],
        },
        output: {
            path: path.join(__dirname, "/public/build"),
            filename: filename,
            publicPath: goal.endsWith("Mob") ? "" : baseName + "/",
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: [
                        path.resolve(__dirname, "src"),
                    ],
                    loader: "babel-loader",
                    options: {
                        babelrcRoots: ["."],
                    },
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(jpe?g|png|gif|svg|ico|mp4)$/i,
                    use: [
                        {
                            loader: "file-loader",
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    include: [
                        path.resolve(__dirname, "src"),
                    ],
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "fonts",
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
                    include: [
                        path.resolve(__dirname, "src"),
                    ],
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "images/",
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
        ],
        devServer: {
            historyApiFallback: true,
            proxy: {},

        },
        target: goal === "dev" || goal === "local" ? "web" : "browserslist",
        externals: {
            config: JSON.stringify(config),
        },
        resolve: {
            alias: {
                // наши зависимости
            },
            extensions: [".js", ".jsx"],
        },
    };
};
