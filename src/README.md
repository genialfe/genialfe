

# 前端开发手册(v0.1)

## 1. 开发约定

### 1.1 项目目录结构

/src下目录结构如下

├── App.css
├── App.test.tsx
├── App.tsx
├── components
│   ├── Login
│   │   └── index.tsx
│   └── NavBar
│       ├── index.tsx
│       └── style.less
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
├── setupTests.ts
└── utils
    └── fetch.ts



组件开发在```/components/${YOUR_COMPONENT_NAME}/index.tsx```下，相关的样式文件等也放在该文件夹中。

```/utils```目录下抽象常用公共方法，例如网络请求方法等。

后续慢慢补充。



## 2. 代码风格(初步)

- 缩进两个空格
- 句尾不加分号
- 变量名使用驼峰命名
- 使用易于理解的变量名

示例:

```tsx
const users = [{
  name: 'foo',
  age: 16
},{
  name: 'bar',
  age: 20
}]

const teenagerNames = users.filter(user => user.age <= 18)
console.log(teenagerNames)

const userNameList = users.map((user) => {
  return (
    <div>
      <p>{user.name}</p>
    </div>
  )
})
```

NOTE:  后续会通过 ```eslint``` & `prettier	` 格式化
## 3. 样式及组件分工

* 参考lunchclub https://lunchclub.com

### 3.1 顶部导航栏(全局)

![截屏2020-12-01 15.14.11](/Users/zzy/Library/Application Support/typora-user-images/截屏2020-12-01 15.14.11.png)

### 3.2 个人档案(https://lunchclub.com/profile)

<img src="/Users/zzy/Library/Application Support/typora-user-images/截屏2020-12-01 15.14.50.png" alt="截屏2020-12-01 15.14.50" style="zoom:50%;" />



### 3.3 主页(https://lunchclub.com/home)

![截屏2020-12-01 15.20.24](/Users/zzy/Library/Application Support/typora-user-images/截屏2020-12-01 15.20.24.png)

如图所示。

#### 3.3.1 Sidebar侧边导航栏


#### 3.3.2 UserCard用户卡片


#### 3.3.3 UserCardList用户卡片列表

由多个UserCard组件构成。



### 3.4 会议(https://lunchclub.com/weekly)

陈列过去发起过的会议信息。lunchclub中没有现成UI，初步考虑与Home类似，做成卡片列表。



### 3.5  邀请(https://lunchclub.com/invite)

![截屏2020-12-01 15.28.36](/Users/zzy/Library/Application Support/typora-user-images/截屏2020-12-01 15.28.36.png)



如图所示，初步开发InviteCard组件，后续开发计划视后端支持情况而定。



### 3.6 设定(https://lunchclub.com/settings)

![截屏2020-12-01 15.30.43](/Users/zzy/Library/Application Support/typora-user-images/截屏2020-12-01 15.30.43.png)

与Home页面类似，左边侧边导航栏，右边具体内容。



## 4. 开发日程

**sprint_1（2020.12.1 - 2020.12.4）** 

开发任务：组件ui开发

具体分工：

- 刘 3.3.2 & 3.3.3 
- 汤 3.2 
- 周 3.1 

实时更新。


**sprint_2（2020.12.7 - 2020.12.11）** 
- profile组件字体/标签优化  汤
- 导航栏样式优化（图标：icon-font） 汤
- mock 以及文档  周
- Login页面（UI）  刘

**当前sprint（2020.12.21 - 2020.12.25）** 
- 注册/登陆流程(UI & 逻辑)  周
- meetings卡片组件 刘
- 设定页面UI 汤
- 用户匹配页面UI
- 联调同步进行
- 导航栏路由

**下个sprint（2020.12.26 - 2020.12.31）计划** 
- 已有UI组件逻辑完善
- 联调
- 打包上线


## 5. 解决方案记录
### 5.1 包管理
报错```Could not find a declaration file for module 'react'```
解决方法: 运行```yarn add@types/react```
常见于项目从JavaScript迁移到TypeScript过程中.

### 5.2 mobx状态管理
文档： https://mobx.js.org/observable-state.html

不使用装饰器函数，而是在类的构造函数中定义该类及其属性、方法的可观察状态：
```typescript
  constructor(props: IWhateverProps) {
    super(props)
    makeObservable(this, { 
      current: observable,  // 定义该属性为observable 该属性改变会更新ui
      setCurrent: action    // 定义该方法为action 更改observable属性必须用action装饰过的方法
    })
  }
```

