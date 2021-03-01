import './App.css';
import React from 'react';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      angle: 0,
      rX: 25,
      rY: 25,
      largeArcFl: 0,
      sweepFl: 0,
      x: 100,
      y: 75,
      center: {
        x: 100,
        y: 100
      }
    };
  }

  _animate = () => {
    const { center, angle, rX, rY, sweepFl } = this.state;

    var newAngle = angle + Math.PI / 180;
    var sF = sweepFl;
    if(newAngle > Math.PI * 2 - Math.PI / 180) {
      newAngle = Math.PI / 180;
      sF = (sweepFl + 1) % 2;
    }

    const x = center.x + rX * Math.cos(newAngle);
    const y = center.y + rY * Math.sin(newAngle);

    this.setState({
      x,
      y,
      angle: newAngle,
      sweepFl: sF,
      largeArcFl: (sF === 0 ?
                    ((newAngle >= 0 && newAngle < Math.PI) ? 1 : 0 )
                    :
                    ((newAngle >= 0 && newAngle < Math.PI) ? 0 : 1 )
                  )
    }, () => {

      //represent the new timeout
      var chase = Math.pow((Math.abs(newAngle - Math.PI) / Math.PI), 4); //[0, 1]
      //[0, 100]
      //[0, 10]
      //[5, 15]
      chase = Math.floor((chase * 100 / 10)) + 5;

      setTimeout(this._animate, chase)
    })
  }

  componentDidMount() {
    this._animate();
  }

  render() {
    const { rX, rY, largeArcFl, sweepFl, x, y} = this.state;

    return (
      <div className="App">
        <header className="App-header">
        <svg className="loading-icon" viewBox="0 0 200 200" height="400" xmlns="http://www.w3.org/2000/svg">
            <path
                d={`
                M 125 100
                A ${rX} ${rY} 0 ${largeArcFl} ${sweepFl} ${x} ${y}
                `}
                stroke="black"
                fill-opacity="0"
                stroke-width="5"
            />
        </svg>
        </header>
      </div>
    );
  }
}