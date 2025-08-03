import React from 'react';
import { starOutline, star } from 'ionicons/icons';

class Rating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      temp_rating: null
    };
  }

  handleMouseover(rating) {
    this.setState((prev) => ({
      rating,
      temp_rating: prev.rating
    }));
  }

  handleMouseout() {
    this.setState((prev) => ({
      rating: prev.temp_rating
    }));
  }

  rate(rating) {
    this.setState({
      rating,
      temp_rating: rating
    });
  }

  render() {
    const { rating } = this.state;
    let stars = [];
    for (let i = 0; i < 10; i++) {
      console.log('i', i);
      let klass = <svg xmlns="http://www.w3.org/2000/svg" width= "50" height= "60" fill="white" class="ionicon" viewBox="0 0 512 512"><path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>;
      if (rating >= i && rating !== null) {
        klass = <svg xmlns="http://www.w3.org/2000/svg" width= "50" height= "60" fill="white" class="ionicon" viewBox="0 0 512 512"><path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"/></svg>;
      }
      stars.push(
        <span
        style={{
          display: 'inline-block',
          width: '25px',
          height: '60px',
          marginTop: '10px',
          overflow: 'hidden',
          direction: i % 2 === 0 ? 'ltr' : 'rtl'
        }}
        className="icon"
        onMouseOver={() => this.handleMouseover(i)}
        onClick={() => this.rate(i)}
        onMouseOut={() => this.handleMouseout()}
      >
        {klass}
      </span>
      );
    }
    return <div className="rating">{stars}</div>;
  }
}

export default Rating;
