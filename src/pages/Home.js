import React, { useState } from 'react';
import aquarium from './images/Photokako-low-image-quality-XmYlAImIb7TPgXW4.jpg';
import outside from './images/outside.jpg';
import cat from './images/cat.jpg';
import bottledog from './images/bottledog.jpg';
import dj from './images/dj.jpg';
import greendog from './images/greendog.jpg';
import cigarette from './images/cigarette.jpg';
import clippy from './images/clippy.png';
import popup from './images/popup.png';
import 'woah.css';
import './Home.css';

function Home() {
    const [isClippyAnimated, setIsClippyAnimated] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(true);

    const handleTitleClick = () => {
        setIsTitleVisible(false);
      };

    const handleClippyClick = () => {
        setIsClippyAnimated(true);
        setTimeout(() => {
        setIsClippyAnimated(false);
        }, 5000); // Reset animation after 1 second
    };
  return (
    <div>
        <img src={require= dj } className = "dj"/>
        <div className ="homeContainer">
        <img src={require= aquarium  } />
        </div>
        <img src={require= cigarette } className = "cigarette" loading = "lazy"/>
        <img src={require= bottledog } className = "bottledog" loading = "lazy"/>
        <img src={require= outside } className = "outside" loading = "lazy"/>
        <img src={require= cat } className = "cat" loading = "lazy"/>
        <img src={require= greendog } className = "greendog" loading = "lazy"/>
        <img
        src={clippy}
        className={`clippy ${isClippyAnimated ? 'animated spin3D' : ''}`}
        onClick={handleClippyClick}
      />
      {isTitleVisible && (  
        <div className="animated dealWithIt fast delay-2s name">
            <img src={require= popup } className = "popup"/>
            <p className = "text">THE WILBS'<br/>COMMUNITY EMPORIUM</p>
            <div onClick = {handleTitleClick} style = {{position: 'absolute',width: '30px', height: '30px', zIndex: 2, left: '24vw', top: '2vh'}}/>
            <div onClick = {handleTitleClick} style = {{position: 'absolute', width: '120px', height: '40px', zIndex: 2, top: '25vh', left: '5vw'}}/>
            <div onClick = {handleTitleClick} style = {{position: 'absolute', width: '120px', height: '40px', zIndex: 2, top: '25vh', left: '14vw'}}/>
        </div>
      )}
    </div>
  )
}

export default Home
