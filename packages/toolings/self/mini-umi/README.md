### 你将获得

1.  类库开发，从0基础到掌握开源类库开发的所有知识；
1.  新人友好，手摸手教你从0开始造轮子；
1.  深入浅出，理解微内核架构、拓展无限可能；
1.  手写内核，一步一步实现umi的微内核架构；
1.  定制框架，教你搭建企业级可插拔定制框架。

### 作者介绍
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前百度、现蚂蚁体验技术部 AntV 开源团队实习生，牛客千粉博主，喜欢探索前端工程化解决方案，热爱开源，喜欢分享技术，同时也是 **AntV** 和 **Umi** 团队的 **Member**，
### 适宜人群：

在校大学生 ，初、中级前端工程师

-   对前端开源社区中类库开发、框架开发、基础架构相关感兴趣的前端工程师
-   对前端工程化感兴趣，想要学习如何参与开源，但没有系统学习认识的在校大学生和初级前端工程师
-   一起阅读源码，和作者一起学习优秀前端工程师们的工程实践经验
-   对于Umi微内核架构感兴趣，对如何基于Umi内核拓展能力开发例如蚂蚁金服的中后台框架-Bigfish，npm包研发工具father，以及刚刚推出的dumi2 感兴趣的前端工程师

### 小册介绍：

如果你现在去使用 Umi，你会发现它是一个类似于Nextjs、Remix一个样的前端框架，它有很多功能：约定式路由、SSR、MOCK数据、配置文件...

像蚂蚁金服内部的中后台前端框架Bigfish其实就是基于Umi框架封装的,类似的还有Dumi、father这两个框架

如果你对如何手写实现这样的前端框架感兴趣，这本小册你一定不能错过 
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf354348729b498a98293151bbbffbb3~tplv-k3u1fbpfcp-watermark.image?)
上图来自 Umi 官网
#### 什么是微内核架构？

如果你平时喜欢玩游戏，那你一定对MOD(模组)这个词并不陌生

通过微内核暴露出来的API，你可以自定义各式各样的模组去实现任何你想要的功能，比方说给你的游戏角色换个衣服，比方说给你的前端框架加个SSR的模式，只不过在前端领域我们把它叫做Plugin-插件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e2bed9af5bd41f891dac907b321e647~tplv-k3u1fbpfcp-watermark.image?)

在本课程中，我分了三个大部分来系统讲述：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69f86c1d874948e68da9d9c4f802539b~tplv-k3u1fbpfcp-watermark.image?)

**1.前端工程化-类库开发**

系统认识如何开发好用的npm类库与框架，每一小节都配备了充足的实战项目，保证新手同学也能看得懂，学得下去，为后续手写内核和框架学习必要工程化知识

**2.手写微内核架构-实现mini-core**

在这一大章，你将认识微内核架构的原理与实现，并亲手实现微内核架构的各个模块，如Service、Plugin、PluginAPI、可扩展插件系统、应用元数据等

**3.手写企业级中后台前端框架**

这一大章你已经实现了自己的微内核架构，我们将在微内核架构的基础上，手写实现一个企业级可用的中后台前端框架-mini-umi

## 体验 mini-umi + Vue3.2 + Vite预设
> ✅ Monorepo 最佳实践 + Turbo 远端构建缓存
```
npx create-mumi 项目名
npm install
npm run dev
npm run ssr // 服务端渲染模式
```
## 实现 Service Core 架构的最简模型
😚已完成：

✅ 实现内置 presets plugin 功能

✅  实现 mini-umi 的 command 系统

✅ 实现编译时 Hook

✅ feat: 读取用户 Local Plugin

✅ 完善插件API

✅ 实现 create-mumi 脚手架

✅ 实现 userConfig 以及 modify 全流程

✅ 实现 Preset-Vue3.2 + Vite + dev build preview

✅ 实现约定式路由 支持动态路由 Vite 支持 Vue3.2 Hmr

✅ 支持对于 dev 约定式路由 的热更新

✅ 支持以 LocalPlugin 的形式 ModifyBundleConfig

✅ 支持用户配置文件自定义路由 和 更改约定式路由所在目录

✅ 可通过 npm run ssr 开启服务端渲染模式

✅ CSR SSR 支持用户自定义Layout

...

🤔More:
- [ ] 实现一套 preset-react
- [ ] 实现一套 preset-qiankun
- [ ] 实现 father
- [ ] 实现 dumi

