# **Webpack Micro Frontend 구축**

## **왜 Micro-Frontend 인가?**

</br>

![micro-frontend](https://microfrontends.com/img/deployment.png)

</br>

웹 어플리케이션이 점점 복잡해지는 과정에서, 많은 조직들이 단일화된 프론트엔트 코드베이스를 유지 및 관리하고, 프론트엔드 개발 과정을 여러 팀에 걸쳐 확장할 수 있는 방법을 찾기 위해 노력하고 있다.
마이크로 프론트엔드는 제품을 더 작고 단순한 어플리케이션의 단위로 분할을 통해 독립적이고 자율적인 팀 개발 환경을 제공하여 이러한 복잡성을 관리하는 하나의 접근 방식이다.</br></br>

### **마이크로 프론트엔드 아키텍쳐에는 다음과 같은 장점이 존재한다.**

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
- 로드된 웹 컴포넌트는 lazy loading을 사용 가능하다.

**_흔히 마이크로 프론트엔드라 알려져 있지만 이것 하나에만 국한된 것은 아니다._**

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

## **Module Federation 사용 예제**

예제 코드 참고: https://github.com/Lajancia/webpack_vue
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

- webpack.config.js 파일 내에 선언된 plugin 내부에 ModuleFederationPlugin을 작성한다.

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

## **이슈**

1. 새로운 컴포넌트를 등록하려고 할 시, 새로 생성된 파일을 읽어들이지 못하는 문제가 발생

   > layout의 webpack.config.js에서 사용할 외부 컴포넌트의 주소를 remotes에 등록시켜야만 layout이 정상적으로 동작한다.

2. vue2를 이용할 시, module을 찾을 수 없는 error가 발생

   > vue2의 main.js 파일에서 `import Vue from "vue"`를 이용하는지 확인하고, 이용하고 있다면, `import { createApp } from "vue";` 혹은 `import { createApp, defineAsyncComponent } from "vue";`의 형태로 변경해주도록 한다.

3. css를 html 내부가 아닌 외부에서 선언할 경우, 불러온 컴포넌트에 색깔이 반영되지 않음.
4. V-for의 형태로 만들어진 데이터가 다른 앱으로 불러 올 때는 출력 되지 않음
   > 웹팩의 module federation에서 제공하는 shared를 통해 모든 파일이 동일한 vue를 사용할 수 있도록 해야 함.
5. toas ui를 사용할 시, 특정 에러가 발생
   > toast editor를 자바스크립트로 불러올 경우, id를 통해 불러와야 함.
6. Uncaught Error: Shared module is not available for eager consumption 에러
   > 웹팩 module federation의 troubleshooting에서 이와 관련된 에러의 해결 방법에 대하여 언급하고 있다.

</br>

## **참고 자료**

- Module Federation 개념 참고: https://blog.bitsrc.io/revolutionizing-micro-frontends-with-webpack-5-module-federation-and-bit-99ff81ceb0

- Webpack 공식 홈페이지 : https://webpack.js.org/concepts/module-federation/

* Vue-CLI yarn : https://cli.vuejs.org/

* HtmlWebpackPlugin 개념 참고 : https://webpack.js.org/plugins/html-webpack-plugin/

* webpack 개념 참고 : https://velog.io/@eye3570/Webpack-part-1
