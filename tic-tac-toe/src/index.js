import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lastClicked: null, 
        status: this.props.status,
        squares: Array(9).fill(null),
      } ;
    }

    handleClick(i) {
      if (this.state.status === 'Game won by: X' || this.state.status === 'Game won by: Y')
        return ;
      const squares = this.state.squares.slice();
      var   gameStatus = this.state.status;
      var   buttonClicked = this.state.lastClicked ;
      var   historyStatus = "" ;

      switch (this.state.lastClicked) {
        case 'X': historyStatus = "Last clicked was 'X'" ; break ;
        case 'O': historyStatus = "Last clicked was 'O'" ; break ;
        default:  historyStatus = ""; break; 
      }


      switch (buttonClicked)
      {
        case 'X': buttonClicked = 'O' ; break ;
        default: buttonClicked = 'X' ; break ;
      }

      gameStatus = 'Next player: ' + (buttonClicked === 'X'? 'O': 'X');

      squares[i] = buttonClicked;

      if (squares[0] != null && squares[0] === squares[1] && squares[0] === squares[2])
        gameStatus = "Game won by: " + squares[0] ;
      else if (squares[3] != null && squares[3] === squares[4] && squares[3] === squares[5])
        gameStatus = "Game won by: " + squares[3] ;
      else if (squares[6] != null && squares[6] === squares[7] && squares[6] === squares[8])
        gameStatus = "Game won by: " + squares[6] ;
      else if (squares[0] != null && squares[0] === squares[3] && squares[0] === squares[6])
        gameStatus = "Game won by: " + squares[0] ;        
      else if (squares[1] != null && squares[1] === squares[4] && squares[1] === squares[7])
        gameStatus = "Game won by: " + squares[1] ;
      else if (squares[2] != null && squares[2] === squares[5] && squares[2] === squares[8])
        gameStatus = "Game won by: " + squares[2] ;
      else if (squares[0] != null && squares[0] === squares[4] && squares[0] === squares[8])
        gameStatus = "Game won by: " + squares[0] ;        
      else if (squares[2] != null && squares[2] === squares[4] && squares[2] === squares[6])
        gameStatus = "Game won by: " + squares[2] ;        

      this.setState({
                      squares: squares, 
                      status: gameStatus,
                      lastClicked: buttonClicked,
                  });
      this.props.game_OnClick(i, gameStatus, historyStatus) ;                  
    }

    renderSquare(i) {
      return <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)} 
      />;
    }
  
    render() {
      return (
        <div id="gameBoard" className="game-board" >
        <div>
          <div className="status">{this.state.status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props) ;
      this.state = {
        gameStatus: "Game starting...",
        history:  [] 
      } ;  
    }

    gameOnClick_event(i, statusMsg, historyStatus) {
      var history = this.state.history.slice() ;
      history = history.concat(<ul>{historyStatus}</ul>) ;
      this.setState({gameStatus: statusMsg, history: history}) ;  
    } ;

    render() {
      return (
        <div>
        <div className="game">
          <div className="game-board">
            <Board status="Next player: X" game_OnClick={(i, statusMsg, historyStatus) => this.gameOnClick_event(i, statusMsg, historyStatus)} />
          </div>
          <div className="game-info">
            <div>{this.state.gameStatus}</div>
            <ol>{this.state.history}</ol>
          </div>
        </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  