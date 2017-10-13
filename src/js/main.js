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
      operator: null,
      first_number: 0,
      second_number: 0,
      display_number: 0
    };
    this.onButtonTouch = this.onButtonTouch.bind(this);
  }
  onButtonTouch(_button) {
    // 何れかのボンタンが押された時に呼ばれる

    if(isNaN(_button)) {
      // 数値以外のボタンが押された場合

      // SAVE the World
      this.state.symbol = _button

      if(this.state.symbol !== '=') {
        // = 以外を operator として保存
        this.state.operator = this.state.symbol;
      }

      if(_button === '=') {
        // = 押したとき計算
        this.state.first_number = calc(this.state.operator, this.state.first_number, this.state.second_number)
        this.setState(() => {
          return {
            // 続けて計算を行えるように、計算結果を最初の数値に保存し二番目の数値を初期化
            display_number: Number(this.state.first_number),
            second_number: 0
          };
        });
      }

      if(_button === 'AC') {
        // AC押したら初期化
        this.setState(() => {
          return {
            symbol: null,
            first_number: 0,
            second_number: 0,
            display_number: 0
          };
        });
      }

    } else {
      // 数値ボタンが押されたの場合

      if(!this.state.symbol) {
        // 記号が入力される前
        if(this.state.first_number === 0) {
          this.setState(() => {
            // 最初だけ押されたボタンの数値を入れる
            return {display_number: this.state.first_number = _button};
          });
        } else {
          this.setState(() => {
            // ディスプレイに表示されている数値 + 押されたボタンの数値の文字列を数値にキャストしてディスプレイに表示する
            return {display_number: Number(this.state.first_number = '' + this.state.first_number + _button)};
          });
        }
      } else {
        // 記号が入力された後
        if(this.state.second_number === 0) {
          this.setState(() => {
            return {display_number: this.state.second_number = _button};
          });
        } else {
          this.setState(() => {
            return {display_number: Number(this.state.second_number = '' + this.state.second_number + _button)};
          });
        }
      }
    }

    console.log(
      'FN: %d SN: %d SY: %s',
      this.state.first_number,
      this.state.second_number,
      this.state.symbol
    )

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
}

// Renderer
ReactDOM.render(
  <Calculator />,
  document.getElementById('app')
);


// Functions
const calc = (operator, x, y) => {
  let ans = 0;

  switch (operator){
    case '+':
      ans = Number(x) + Number(y);
      break;
    case '-':
      ans = Number(x) - Number(y);
      break;
    case '*':
      ans = Number(x) * Number(y);
      break;
    case '/':
      ans = Number(x) / Number(y);
      break;
    case '%':
      ans = Number(x) % Number(y);
      break;
  }

  return ans
};
