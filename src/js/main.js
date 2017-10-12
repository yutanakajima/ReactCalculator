import React from 'react';
import ReactDOM from 'react-dom';


// Component
const Title = (props) => {
  return <h1 className="calculator-title">{props.title}</h1>
}

const Display = (props) => {
  return <p className="display">{props.number}</p>
}

const Button = (props) => (
  <button className={`btn btn-${props.type}`} type="button" onClick={() => props.onButtonTouch(props.symbol)}>{props.symbol}</button>
)

class Panel extends React.Component {
  constructor(props) {
    super(props);
  }
  renderButtons(type, symbol) {
    return <td><Button type={type} symbol={symbol} onButtonTouch={this.props.onButtonTouch} /></td>
  }
  renderZeroButton() {
    return <td colSpan="2"><Button type="default btn-zero" symbol={0} onButtonTouch={this.props.onButtonTouch} /></td>
  }
  render() {
    return(
      <table>
        <tbody>
          <tr>
            {this.renderButtons('default', 'AC')}
            {this.renderButtons('default', '±')}
            {this.renderButtons('default', '%')}
            {this.renderButtons('accent', '/')}
          </tr>
          <tr>
            {this.renderButtons('default', 7)}
            {this.renderButtons('default', 8)}
            {this.renderButtons('default', 9)}
            {this.renderButtons('accent', '*')}
          </tr>
          <tr>
            {this.renderButtons('default', 4)}
            {this.renderButtons('default', 5)}
            {this.renderButtons('default', 6)}
            {this.renderButtons('accent', '-')}
          </tr>
          <tr>
            {this.renderButtons('default', 1)}
            {this.renderButtons('default', 2)}
            {this.renderButtons('default', 3)}
            {this.renderButtons('accent', '+')}
          </tr>
          <tr>
            {this.renderZeroButton()}
            {this.renderButtons('default', '.')}
            {this.renderButtons('accent', '=')}
          </tr>
        </tbody>
      </table>
    );
  }
}


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: null,
      first_number: null,
      second_number: null,
      display_number: 0
    };
    this.onButtonTouch = this.onButtonTouch.bind(this);
  }
  onButtonTouch(_button) {
    // alert('onClickButton: ' + __button)

    if(isNaN(_button)){
      // 文字列の場合
      //alert('記号: ' + _button)
      if(!this.first_number) {
        this.state.first_number = Number(this.state.first_number);
      }

      if(!this.second_number) {
        this.state.second_number = Number(this.state.second_number);
      }

      if(_button === 'AC') {
        // AC押したら初期化
        this.setState(() => {
          return {
            symbol: null,
            first_number: null,
            second_number: null,
            display_number: 0
          };
        });
      }

      this.state.symbol = true;

      alert(
        'First Number: ' + this.state.first_number + '\n' +
        'Second Number: ' + this.state.second_number + '\n' +
        'Answer Number: ' + this.state.answer_number
      );

    }　else {
      // 数値の場合
      // alert('数値: ' + _button)

      if(!this.state.symbol) {
        // 記号類が入力される前
        if(this.state.display_number === 0) {
          // ディスプレイに表示されている数値が 0 の時
          this.setState(() => {
            // 押されたボタンの数値を入れる
            return {display_number: this.state.first_number = _button};
          });
        } else {
          // ディスプレイに表示されている数値が 0 以外
          this.setState(() => {
            // ディスプレイに表示されている数値 + 押されたボタンの数値 を文字列としてディスプレイに表示する
            return {display_number: this.state.first_number = '' + this.state.first_number + _button};
          });
        }
      } else {
        // 記号類が入力された後

        if(this.state.display_number === 0) {
          this.setState(() => {
            return {display_number: this.state.second_number = _button};
          });
        } else {
          this.setState(() => {
            return {display_number: this.state.second_number = '' + this.state.second_number + _button};
          });
        }
      }

    }

  }
  render() {
    return (
      <div>
        <Title title="React Calculator" />
        <Display number={this.state.display_number} />
        <Panel onButtonTouch={this.onButtonTouch} />
      </div>
    );
  }
};

// Renderer
ReactDOM.render(
  <Calculator />,
  document.getElementById('app')
);


// Functions
const isType = (button) => {

}

const calc = (operator, nums) => {
  ans = null;

  switch (operator){
    case '+':
      ans = nums + nums;
      break;
    case '-':
      ans = nums - nums;;
      break;
    case '*':
      ans = nums * nums;
      break;
    case '/':
      ans = nums / nums;
      break;
    case '%':
      ans = nums % nums;
      break;
  }
  return null
};

const list = [
  ['AC', '±', '%', '/'],
  [7, 8, 9, '*'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '=']
]


// Test

const Test = (props) => {
  return <h1 className="react-test-header">{props.test}</h1>
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: 'TEST: Click me!'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(() => {
      return { value1: 'TEST: Done!!' };
    });
  }
  render() {
    return (
      <div>
        <Child data={this.state.value1} handleClick={this.handleClick} />
      </div>
    );
  }
}

const Child = (props) => (
  <div onClick={props.handleClick}>
    {props.data}
  </div>
);

ReactDOM.render(
  <Parent />,
  document.getElementById('react_test')
);