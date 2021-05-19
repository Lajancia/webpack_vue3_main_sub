# **Module-Federation 기반 Micro Frontend 구축**

> 작성자: 한국외국어대학교 컴퓨터전자시스템공학부 - 황수민

> 실습 진행: 한국외국어대학교 - 황수민, 정주현, 남기훈, 김준성

</br>

## **Micro-Frontend란?**

</br>

![micro-frontend](https://martinfowler.com/articles/micro-frontends/horizontal.png)

**마이크로 프론트엔드는 제품을 더 작고 단순한 어플리케이션의 단위로 분할을 통해 독립적이고 자율적인 팀 개발 환경을 제공하는 하나의 접근 방식이다.**

</br>

### **마이크로 프론트엔드 아키텍쳐에는 다음과 같은 특징을 가진다**

- Micro-frontend 아키텍쳐는 사용하기 간단하고, 비교적 관리하기가 쉽다.</br>
- 독립적인 개발팀이 훨씬 쉽게 프론트 엔드 어플리케이션을 공동으로 작업하기 용이하다.
- 하나의 코드를 여러 곳에서 재사용이 가능하다.
- 각각의 컴포넌트에 서로 다른 기술(JavaScript, React, Vue, Angular 등)을 사용 가능하다.
- 기존의 단일화된 코드에서 분할된 어플리케이션의 간소화된 코드가 팀에 합류하는 개발자들의 접근성을 낮추는 것에 기여한다.
  </br>

**이러한 Micro frontend 아키텍쳐를 구현하기 위해 Webpack에서 제공하는 Module Federation을 이용한다.**

</br>

## **Micro-Frontend와 webpack**

![webpack](https://media.vlpt.us/images/eye3570/post/a8aa94b2-c3e2-4cb4-8754-bbf4c5fb79c1/webpack.png)

**_webpack은 오픈소스 자바스크립트 모듈 번들러이다._**

자바스크립트에서 모듈이란 js로 이루어진 작은 기능단위 코드를 지칭한다. 하지만 webpack은 js 모듈 뿐만 아니라 스타일시트, 이미지 등 모든 것을 자바스크립트 모듈로 로딩해서 사용한다.

이러한 웹팩에서 지원하는 Webpack plugin 중 하나인 `Module Federation`은 Micro Frontend 프레임워크를 구현하는 것에 도움을 준다.

</br>

### **Module Federation이란?**

**간단히 말해 자바스크립트 응용프로그램이 다른 응용프로그램에서 동적으로 코드를 가져올 수 있도록 허용하는 자바스크립트 아키텍쳐이다.**

- 여러개로 분리되어있는 개별 빌드들이 하나의 어플리케이션 형태를 만들어 각 부분별로 독자적인 개발과 배치를 가능하게 한다.
- 간단하게 라이브러리를 제공 및 공유할 수 있다.
- 동적으로 웹 컴포넌트를 로드하고, 래퍼(wrapper)를 사용하여 웹 컴포넌트로 라우팅할 수 있다.
- 로드된 웹 컴포넌트는 [lazy loading](https://webpack.js.org/guides/lazy-loading/)을 사용 가능하다.

**_Module federation은 흔히 마이크로 프론트엔드라 알려져 있지만 이것 하나에만 국한된 것은 아니다._**

</br>

### **Module Federation 번역 참고**

- [Webpack Module Federation 번역](https://github.com/Lajancia/webpack/blob/main/module-federation.md)

- [Webpack Module Federation 원문](https://webpack.js.org/concepts/module-federation/)

</br>

### **Webpack 이용 관련 추가 개념**

**webpack Loader**

- vue-loader : `vue-loader`는 작성된 Vue 컴포넌트를 일반적인 자바스크립트 모듈로 변환할 수 있는 webpack에서 사용하는 로더이다.

- css-loader : 어플리케이션에 참조된 모든 css 파일을 참조하고 수집하여 문자열에 집어넣도록 하는 모듈이다.

- url-loader : 파일을 base64 URL로 변환하는 처리를 한다. 즉 파일을 옮기는 작업이아니라 변환해서 output directory에 저장하는 역할을 한다.

</br>

**ModuleFederationPlugin**

- `filename : remoteEntry.js` : 임시 파일명이다. remoteEntry.js를 사용하지 않더라도, 추후 filename과 remotes 내부에 선언된 주소의 뒷부분 이름과 일치하면 정상적으로 동작한다. (예: sub1@http://localhost:3002/remoteEntry.js)

* `shared: require("./package.json").dependencies` : 해당 어플리케이션의 package.json에서 사용하는 모듈을 module federation plugin을 통해 외부 어플리케이션과 공유한다.

</br>

</br>

## **Module Federation 예제 코드 분석**

예제 코드 참고: [webpack_vue3_main_sub](https://github.com/Lajancia/webpack_vue3_main_sub)
![main_sub](https://user-images.githubusercontent.com/50996139/117684315-d728af80-b1ef-11eb-8e32-bf4286b72cd8.jpg)

### **수행순서**

1. main에서 나타나게 할 sub1과 sub2를 각각의 웹팩에서 ModuleFederationPlugin 내부에 expose로 등록한다. 이때 sub1은 3002번 포트, sub2는 3003번 포트로 지정한다.
2. main의 webpack.config.js에 두 개의 3002번 포트와 3003번 포트를 remoteEntry로 등록한다.
3. main.js에서 웹팩에 등록된 포트에서 가져와 사용할 컴포넌트를 등록한다.
4. 등록된 컴포넌트의 태그를 Layout.vue 파일에서 사용하여 화면에 모두 출력될 수 있도록 한다.

</br>

### **이미지 가이드**

![webpack_image_guide](https://user-images.githubusercontent.com/50996139/117684362-e27bdb00-b1ef-11eb-93fe-0f2ab7da4ced.jpg)

</br>

### **프로젝트 구현을 위한 구성(공통)**

</br>

**Vue_CLI 프로젝트 생성**

```
yarn global add @vue/cli
vue create my-project
```

</br>

**실행 방법**

```
yarn install
yarn start
```

</br>

**webpack.config.js 파일 생성**

```javascript
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = (env = {}) => ({
  mode: "development",
  cache: false,
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  target: "web",
  entry: path.resolve(__dirname, "./src/main.js"),

  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.prod },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ]
```

</br>

**webpack 사용을 위한 package.json 구성**

```json
"scripts": {
    "start": "webpack-cli serve",
    "serve": "serve dist -p 3002",
    "build": "webpack --mode production",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@babel/core": "^7.11.0",
    "babel-loader": "^8.1.0",
    "serve": "^11.3.2",
    "vue": "^3.0.0-rc.5"
  },
  "devDependencies": {
    "@vue/compiler-sfc": "3.0.0",
    "css-loader": "3.6.0",
    "file-loader": "6.2.0",
    "html-webpack-plugin": "^5.3.1",
    "mini-css-extract-plugin": "0.9.0",
    "url-loader": "4.1.1",
    "vue-loader": "16.0.0-beta.8",
    "webpack": "^5.36.2",
    "webpack-cli": "^4.6.0",
    "webpack-dev-server": "^3.11.2"
  }
```

</br>

### **프로젝트 구현을 위한 구성 - sub1**

**1. src>components>Button.js**

```javascript
import { render, h } from "vue";
const button = {
  name: "btn-component",
  render() {
    return h(
      "button",
      {
        id: "btn-primary",
      },
      "Hello World"
    );
  },
};
export default button;
```

</br>

- html 화면에 버튼을 생성하는 코드이다. 버튼에는 "Hello World" 문구가 함께 출력되어 나타난다.

</br>

**2. src>components>Content.vue**

```javascript
<template>
  <div style="color: red;">{{ title }}</div>
</template>
<script>
export default {
  data() {
    return {
      title: "Remote Component in Action..",
    };
  },
};
</script>
```

- title로 등록된 "Remote Component in Action.."를 출력하는 코드이다.

- 색상이 red로 출력된다.

</br>

**3. webpack.config.js**

```javascript
new ModuleFederationPlugin({
  name: "sub1",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./Content": "./src/components/Content",
    "./Button": "./src/components/Button",
  },
  shared: require("./package.json").dependencies,
}),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./index.html"),
  }),
  new VueLoaderPlugin();
```

- webpack.config.js 파일 내에 선언된 plugin 내부에 `ModuleFederationPlugin`을 작성한다.

- exposes에서 외부로 노출할 Content와 Button을 각각 등록시킨다. 이는 다른 파일의 웹팩에서 불러내어 사용할 수 있게 된다.

</br>

```javascript
devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3002,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
```

- sub1이 등록된 3002번 포트가 다른 포트에서 공유될 때 CORS 규제를 우회할 수 있도록 등록한다.

</br>

### **프로젝트 구현을 위한 구성 - sub2**

**1. src>components>Buttonsub.js**

```javascript
import { render, h } from "vue";
const button = {
  name: "btn-component",
  render() {
    return h(
      "button",
      {
        id: "btn-primary",
      },
      "This is sub"
    );
  },
};
export default button;
```

- 버튼을 생성하는 코드이다. 버튼에는 "This is sub"라는 문구를 출력한다.

</br>

**2. src>components>Remote.vue**

```javascript
<template>
  <div style="color: lime">{{ title }}</div>
</template>
<script>
export default {
  data() {
    return {
      title: "Remote sub component",
    };
  },
};
</script>

```

- 문자를 출력하는 vue 파일이다. "Remote sub component"를 lime 색상으로 출력한다.

</br>

**3. webpack.config.js**

```javascript
 new ModuleFederationPlugin({
      name: "sub2",
      filename: "remoteEntry.js",
      remotes: {
      },
      exposes: {
        "./Remote": "./src/components/Remote",
        "./Buttonsub": "./src/components/Buttonsub",
      },
       shared: require("./package.json").dependencies,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
    new VueLoaderPlugin(),
```

- webpack.config.js 파일 내에 선언된 plugin 내부에 ModuleFederationPlugin을 작성한다.

- exposes에서 외부로 노출할 Remote와 Buttonsub를 각각 등록시킨다. 이는 다른 파일의 웹팩에서 불러내어 사용할 수 있게 된다.

</br>

```javascript
devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3003,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
```

- sub2를 등록한 3003번 포트가 다른 포트에서 사용될 시 CORS 규제 정책으로 인해 막히지 않도록 해당 포트를 등록하여 우회하도록 한다.

</br>

### **프로젝트 구현을 위한 구성 - main**

**1. webpack.config.js**

```javascript
 new ModuleFederationPlugin({
      name: "main",
      filename: "remoteEntry.js",
      remotes: {
        home: "home@http://localhost:3002/remoteEntry.js",
        sub: "sub@http://localhost:3003/remoteEntry.js",
      },
      exposes: {},
       shared: require("./package.json").dependencies,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      chunks: ["main"],
    }),
    new VueLoaderPlugin(),
```

- webpack.config.js에서 remotes를 통해 외부에서 가져와 사용할 두 개의 컴포넌트 주소를 등록한다.
- main에서는 외부로 내보낼 컴포넌트가 없기 때문에 expose는 비워둔다.

</br>

```javascript
 devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
```

- main의 포트인 3001번 포트가 다른 포트를 불러낼 시 CORS 규제에 막히지 않도록 포트를 등록하여 우회하도록 하는 코드이다.

</br>

**2. src>bootstrap.js 와 src>bootstrap.js**

```javascript
import { createApp, defineAsyncComponent } from "vue";
import Layout from "./Layout.vue";

const Content = defineAsyncComponent(() => import("sub1/Content"));
const Button = defineAsyncComponent(() => import("sub1/Button"));

const Remote = defineAsyncComponent(() => import("sub2/Remote"));
const Buttonsub = defineAsyncComponent(() => import("sub2/Buttonsub"));

const app = createApp(Layout);

app.component("remote-element", Remote);
app.component("buttonsub-element", Buttonsub);
app.component("content-element", Content);
app.component("button-element", Button);

app.mount("#app");
```

- webpack에서 외부로 노출시킨 컴포넌트를 받은 뒤, bootstrap.js에서 각각의 컴포넌트를 태그로 사용할 수 있도록 등록해준다.

* 여기서 사용되는 `defineAsyncComponent()`는 전달인자 중 하나로, 필요한 경우에만 로드되는 비동기 컴포넌트를 만들어낸다.

```js
import("./bootstrap");
```

- bootstrap.js에서 정의된 코드를 Import를 통해 main.js로 가져온다. 이는 `Uncaught Error: Shared module is not available for eager consumption` 에러가 발생하는 것을 방지하기 위한 방법이다.

</br>

**3. src>Layout.vue**

```javascript
<template>
  <div class="layout-app">
    <!-- host app HOST-->
    <div class="app-label"># Hosting App [HOST]</div>
    <img src="./logo.png" width="30" />
    <h1>Layout App 1</h1>
    <div class="remote-component">
      <!-- remote-component REMOTE -->
      <div class="app-label">#remote-component [REMOTE]</div>
      <content-element />
      <button-element />
      <br />
      <remote-element />
      <buttonsub-element />
    </div>
  </div>
</template>

<script>
export default {};
</script>

```

- 외부에서 가져온 컴포넌트가 동작할 위치에 main.js에서 등록한 이름을 이용하여 태그로 나타낸다.
- 태그가 위치한 장소에 각각의 컴포넌트가 나타난다.

</br>

## **Module-Federation을 활용한 댓글 Application 컴포넌트 이용**

### **실행 이미지**
![comment component 사용](https://user-images.githubusercontent.com/50996139/118784733-37dc7a00-b8cb-11eb-9f24-6b14d43d4294.jpg)

<br/>

### **수행순서**
![파일 ](https://user-images.githubusercontent.com/50996139/118784847-4fb3fe00-b8cb-11eb-97f6-eab69a55001c.jpg)


1. main의 App.vue에서 사용할 댓글 컴포넌트를 comment의 webpack.config.js의 ModuleFederationPlugin 내부에 expose로 등록한다.
2. comment의 webpack.config.js에 등록된 컴포넌트를 main에서 이용하기 위해, ModuleFederationPlugin 내부의 remotes에 해당 컴포넌트의 호스트를 등록한다.
3. main.js로 import 되어있는 bootstrap.js파일에서 웹팩 module federation을 통해 가져온 comment 컴포넌트를 App.vue에서 사용하기 위해 등록한다.
4. 각각의 프로그램을 로컬 호스트로 올리면, 3001번에 등록된 컴포넌트를 3002번 App.vue에서 사용한다.

<br/>

### **프로젝트 구현을 위한 구성(공통)**

**vue3-CLI + element UI**

- 편의를 위해 vue3 CLI에서 element UI가 설치되어있는 [element-plus-starter](https://github.com/element-plus/element-plus-starter) 프로젝트를 제공한다.

- yarn을 이용하여 동작시키기 위해 yarn을 설치한다.

```
yarn install
```

<br/>

**webpack 적용**

- webpack.config.js

```javascript
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = (env = {}) => ({
  mode: "development",
  cache: false,
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  target: "web",
  entry: path.resolve(__dirname, "./src/main.js"),

  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        loader: "style-loader",
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 },
        },
      },
      { test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: "file-loader" },
      { test: /\.(png|jpg|gif|svg)(\?\S*)?$/, loader: "file-loader" },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !env.prod,
              publicPath: "",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      chunks: ["main"],
    }),
    new VueLoaderPlugin(),
  ],
});
```

> loader를 통해 웹팩에서 공유하는 파일들을 불러올 시, 어떤 종류의 파일을 가져올지 설정할 수 있다.

- tailwindcss와 같은 추가적인 css framework를 이용할 시, 웹팩을 통해 정상적으로 동작할 수 있도록 postcss-loader 모듈을 추가해야 한다.

<br/>

**package.js**

```json
"scripts": {
    "start": "webpack-cli serve",
    "serve": "serve dist -p 3001",//알맞은 포트 번호로 변경
    "build": "webpack --mode production",
    "clean": "rm -rf dist"
  },
```

- webpack에서 서버가 돌아가게 하기 위해서 기존의 scripts를 수정한다.

<br/>

```json
 "dependencies": {
    "axios": "^0.21.1",
    "core-js": "^3.6.5",
    "element-plus": "^1.0.2-beta.44",
    "json-server": "^0.16.3",
    "postcss-loader": "^5.3.0",
    "serve": "^11.3.2",
    "style-loader": "^2.0.0",
    "tailwindcss": "yarn:@tailwindcss/postcss7-compat",
    "vue": "^3.0.0"
  },
```

- db.json과 통신하기 위해 axios와 json-server가 필요하다.
- postcss-loader를 통해 tailwindcss가 적용된 외부 파일을 가져올 수 있도록 한다.

<br/>

```json
"devDependencies": {
    "css-loader": "3.6.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^7.0.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.1",
    "mini-css-extract-plugin": "0.9.0",
    "postcss": "^7",
    "url-loader": "4.1.1",
    "vue-loader": "16.0.0-beta.8",
    "webpack": "^5.36.2",
    "webpack-cli": "^4.6.0",
    "webpack-dev-server": "^3.11.2"
}
```

- 웹팩이 동작하기 위한 하단의 세 가지 모듈을 추가해야 한다.
- 웹팩에서 사용할 몇 가지 loader을 추가해야 한다.

<br/>

**webpack tailwindcss 적용**

- tailwindcss 설치와 webpack 설정 추가 방법은 [여기](https://www.imkh.dev/vue-tailwindcss/)를 참고하여 설치한다.
- postcss plugin을 사용하기 위해 추가적으로 모듈을 설치한다.

```
yarn add -D tailwindcss@yarn:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

- tailwindcss가 동작하기 위해서는 이를 적용할 모든 파일에 tailwindcss를 설치해줄 필요가 있다.
- 외부에서 가져오는 파일의 tailwindcss를 읽어내기 위해서는 postcss-loader가 필요하다.

```javascript
{
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: !env.prod,
                    publicPath:''
                },
          },
          "css-loader",'postcss-loader'
        ],
      },
```

<br/>

### **프로젝트 구현을 위한 구성 - comment**

**1. src>db>db.json**

- json-server --watch ./src/db/db.json을 통해 comment에서 사용할 데이터들을 저장하는 역할을 담당한다.

<br/>

**2. src>components>comments>index.vue**

- 댓글 기능을 수행할 vue 코드 작성한다.

<br/>

**3. src>App.vue**

```html
<template>
  <div>
    <div class="text-green-700">this is original comment page!</div>
    <Comment />
  </div>
</template>

<script>
  import Comment from "./components/comments/index.vue";

  export default {
    name: "App",
    components: {
      Comment,
    },
  };
</script>
```

- comment 애플리케이션이 동작 시 App.vue의 코드가 화면에 출력된다.

<br/>

**4. src>main.js**

```javascript
import("./bootstrap");
```

- 앞선 예제와 같이, main.js에서 코드를 바로 가져오게 되면 발생하는 module federation 이슈로 인해 bootstrap에서 코드를 import 하여 사용하도록 한다.

<br/>

**5. src>bootstrap.js**

```javascript
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/tailwind.css";

createApp(App).use(ElementPlus).mount("#app");
```

- element-ui와 tailwindcss가 동작할 수 있도록 등록한다.

<br/>

**6. webpack.config.js**

```js
plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ModuleFederationPlugin({
      name: "comment",
      filename: "remoteEntry",
      remotes: {


      },
      exposes: { "./Comment": "./src/components/comments/index.vue",},
       shared: require("./package.json").dependencies,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      chunks: ["main"],
    }),
    new VueLoaderPlugin(),
  ],
```

- comment에서 컴포넌트로 외부에서 사용할 수 있도록 exposes에 index.vue 파일을 등록한다.
- 이후에 이 컴포넌트를 외부에서 호출할 경우, comment/Comment로 호출할 수 있다.

<br/>

### **프로젝트 구현을 위한 구성 - main**

**1. src>main.js**

```js
import("./bootstrap");
```

- module federation 이슈 해결을 위해 bootstrap.js 파일에서 코드를 불러올 수 있도록 한다.

<br/>

**2. src>bootstrap.js**

```js
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import "./assets/css/tailwind.css";

const Comment = defineAsyncComponent(() => import("comment/Comment"));

const app = createApp(App);

app.component("comment-element", Comment);

app.use(ElementPlus);
app.mount("#app");
```

- main.js에서 사용될 코드를 가진다.
- webpack을 통해 공유된 comment의 어플리케이션을 태그로 사용하기 위해 등록한다.
- `defineAsyncComponent`에 import 할 때, import("name/exposes")의 형태로, 각각 moduleFederationPlugin에 등록된 이름과 exposes에 등록된 이름 두 개로 호출 해온다.

<br/>

**3. webpack.config.js**

```js
 plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry",
      remotes: {
    comment: "comment@http://localhost:3001/remoteEntry",

      },
      exposes: { },
       shared: require("./package.json").dependencies,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      chunks: ["main"],
    }),
    new VueLoaderPlugin(),
  ],
```

- comment 파일에서 exposes로 등록한 컴포넌트를 remotes를 통해 불러온다.

<br/>

```js
resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.md'],
  },
```

- main에서는 추가적으로 마크다운 파일에서 문서를 읽어들여 출력해내기 위해 위와 같이 확장자를 추가한다.

<br/>

**4. package.json**

```js
"vue-markdown-loader": "^2.4.1"
```

- vue에서 마크다운을 읽어낼 수 있도록 loader 모듈을 추가한다.

<br/>

## **이슈**

**Module Federation 예제 코드 분석**

1. 새로운 컴포넌트를 등록하려고 할 시, 새로 생성된 파일을 읽어들이지 못하는 문제가 발생

   > layout의 webpack.config.js에서 사용할 외부 컴포넌트의 주소를 remotes에 등록시켜야만 layout이 정상적으로 동작한다.

2. vue2를 이용할 시, module을 찾을 수 없는 error가 발생

   > vue2의 main.js 파일에서 `import Vue from "vue"`를 이용하는지 확인하고, 이용하고 있다면, `import { createApp } from "vue";` 혹은 `import { createApp, defineAsyncComponent } from "vue";`의 형태로 변경해주도록 한다.

3. css를 html 내부가 아닌 외부에서 선언할 경우, 불러온 컴포넌트에 색깔이 반영되지 않음
   > 추가적인 loader 설치가 필요한지 확인해볼 필요가 있다.
4. V-for의 형태로 만들어진 데이터가 다른 앱으로 불러 올 때는 출력 되지 않음
   > 웹팩의 module federation에서 제공하는 shared를 통해 모든 파일이 동일한 vue를 사용할 수 있도록 해야 한다.
5. toas ui를 사용할 시, 특정 에러가 발생
   > toast editor를 자바스크립트로 불러올 경우, id를 통해 불러와야 한다.
6. Uncaught Error: Shared module is not available for eager consumption 에러
   > 웹팩 module federation의 troubleshooting에서 이와 관련된 에러의 해결 방법에 대하여 언급하고 있다.

</br>

**Module-Federation을 활용한 댓글 Application 컴포넌트 이용**

1. tailwindcss 설치시 postcss를 설치하였음에도 postcss가 필요하다는 에러가 발셍
   > yarn add -D tailwindcss@yarn:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 을 설치하면 문제가 해결된다.
2. 깃허브에서의 파일 실행 시, yarn install을 해도 모듈이 몇가지 누락되어 제대로 실행되지 않을 경우

   - yarn add axios

   - yarn add json-server

   - yarn add-tailwindcss

   - yarn add -D tailwindcss@yarn:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

   > 위의 모듈을 추가로 설치하면 정상적으로 동작한다.

3. Markdown 파일을 불러왔을 경우, 제대로 서버가 동작하지 않는 문제가 발생
   > 뷰에서 마크다운을 읽어낼 경우, 마크다운에 작성된 코드들을 형식에 맞게 읽어내지 못하는 문제가 발생한다. 따라서 코드의 형식(javascript, html 등)을 삭제하고 ` `만을 사용하여 코드를 묶어주면 해결된다.

<br/>

## **참고 자료**

- [MicroFrontend 개념 참고](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation 개념 참고](https://blog.bitsrc.io/revolutionizing-micro-frontends-with-webpack-5-module-federation-and-bit-99ff81ceb0)

- [Webpack 공식 홈페이지](https://webpack.js.org/concepts/module-federation/)

* [Vue-CLI yarn](https://cli.vuejs.org/)

* [HtmlWebpackPlugin 개념 참고](https://webpack.js.org/plugins/html-webpack-plugin/)

* [webpack 개념 참고](https://velog.io/@eye3570/Webpack-part-1)

* [tailwindcss 사용 참고]()

* [tailwindcss webpack 설치 참고]()

* [element-ui 사용 참고]()
