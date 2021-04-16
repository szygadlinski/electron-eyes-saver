import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime = () => {
    const seconds = String(this.state.time % 60).padStart(2, '0');
    const minutes = String(Math.floor(this.state.time / 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  step = () => {
    const newTime = this.state.time - 1;
    this.setState({ time: newTime });

    if (this.state.time === 0) {
      this.playBell();

      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        });
      } else {
        this.setState({
          status: 'work',
          time: 1200,
        });
      }
    }
  }

  startTimer = () => {
    const timer = setInterval(this.step, 1000);
    this.setState({
      status: 'work',
      time: 1200,
      timer: timer,
    });
  }

  stopTimer = timer => {
    this.setState({
      status: 'off',
      time: 0,
      timer: clearInterval(timer),
    });
  }

  closeApp = () => {
    window.close();
  }

  render() {
    const { status, timer } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        { (status === 'off') && <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p> }
        { (status === 'off') && <p>This app will help you track your time and inform you when it is time to rest.</p> }

        { (status === 'work') && <img src='./images/work.png' alt='work' /> }
        { (status === 'rest') && <img src='./images/rest.png' alt='rest' /> }

        { (status !== 'off') && <div className='timer'>{this.formatTime()}</div> }

        { (status === 'off') && <button className='btn' onClick={() => this.startTimer()}>Start</button> }
        { (status !== 'off') && <button className='btn' onClick={() => this.stopTimer(timer)}>Stop</button> }

        <button className='btn btn-close' onClick={() => this.closeApp()}>X</button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
