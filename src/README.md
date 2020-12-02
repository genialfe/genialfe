

# 前端开发手册(v0.1)

## 1. 项目目录结构

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

```/utils```目录下抽象公共方法，例如网络请求方法等。

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

**当前sprint（2020.12.1 - 2020.12.4）** 

开发任务：组件ui开发

具体分工：

- 刘 3.3.2 & 3.3.3
- 汤 3.2
- 周 3.1

实时更新。


