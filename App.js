import './App.css';
import React from 'react';


export default class App extends React.Component {
  constructor(props) {
    super(props);
	
    this.state = {
      angle: 0,
      rX: 50,
      rY: 50,
      xRot: 0,
      largeArcFl: 0,
      sweepFl: 0,
      x: 0,
      y: 0,
      xS: 250,
      yS: 200,
      center : {
        x: 200,
        y: 200
      },
    }
  }

  _trigger_changeArc = () => {
    const { center, angle, sweepFl, rX, rY } = this.state;

    var newAngle = angle + Math.PI / 180;
    var sF = sweepFl;
    if(newAngle > Math.PI * 2 - Math.PI / 180) {
      newAngle = Math.PI / 180;
      sF = (sweepFl + 1) % 2;
    }

    const x = center.x + rX * Math.cos(newAngle);
    const y = center.y + rY * Math.sin(newAngle);

    this.setState({
      x, y,
      sweepFl: sF,
      angle: newAngle,
      largeArcFl: (sF === 0 ?
                    ((newAngle >= 0 && newAngle < Math.PI) ? 1 : 0)
                    :
                    ((newAngle >= 0 && newAngle < Math.PI) ? 0 : 1)
                  )
    }, () => {
      //depending on how far the angle is from Math.PI, "bounce" slower
      var bounce = Math.pow((Math.abs((newAngle - Math.PI)) / Math.PI), 4); //Number between 0 and 1, skewed by N^4
      bounce = Math.floor((bounce * 100 / 10)) + 5; //Between 5 and 15
      setTimeout(this._trigger_changeArc, bounce)
    })
  }

  componentDidMount() {
    this._trigger_changeArc();
  }

  render() {
    const { rX, rY, xRot, largeArcFl, sweepFl, x, y, xS, yS } = this.state;
    const { height, strokeColor, strokeWidth, fillOpacity } = this.props;
    return (
      <div className="App">
        <header className="App-header">
        <svg className="App-logo" viewBox="0 0 400 400" height={height || 400} xmlns="http://www.w3.org/2000/svg">
          <path
            d={`M ${xS} ${yS} A ${rX} ${rY} ${xRot} ${largeArcFl} ${sweepFl} ${x} ${y}`}
            stroke={strokeColor || 'black'}
            fillOpacity={fillOpacity || "0"}
            strokeWidth={strokeWidth || "15"}
          />
        </svg>
        </header>
      </div>
    );
  }
}