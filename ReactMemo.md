# React Memo

## Component Syntax

```
class Component extends React.Component {
  render() {
    <div className="test"></div>
  }
}
```

### render のみの書き方 (Stateless Functional Components)
- アロー関数
```
const Component = (props) => {
  return <div className="test">{props.test}</div>
}
```

```
const Component = function() {
  return <div className="test"></div>
}
```

#### return 不要パターン
```
const Component = (props) => <div className="test">{props.test}</div>
```

```
const Component = (props) => (
  <div className="test">{props.test}</div>
)
```

## props, state, ref ←あとで詳しく書く
### props
- 読み取り時の値だけ使う

### state
- 変更可能

### ref
- 使わないほうが良いらしい ← 使わないで書けるとか

## Other Tips
- Component名は大文字で始める

OK
```
class Component extends React.Component {...
```
NG
```
class component extends React.Component {...
```
- 修飾子 (ES6)
const, let 使える
```
cont hoge; //再宣言、再代入 NG
let piyo; //再宣言 NG、再代入 NG
```
### React ver
- `v0.14.8` から `v15.0.0` といきなり飛んでる

## 不要そうなやつ
### Component
- エラーになる ← 16.0で削除されたらしい？
```
var Component = React.createClass({
  render() {
    /* Node */
  }
}
```
### createElement
- JSX使ったほうが良さそう
```
var test = React.createElement('div');
```

## 参考など
> ただし、React.PropTypes と React.createClassを使っているとログに警告が出ているはず
これらの機能はv16では、削除される機能
- [PropTypes](https://reactjs.org/warnings/dont-call-proptypes.html) は完全に消えているわけではないみたい
