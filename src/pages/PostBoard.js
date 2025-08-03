import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, onSnapshot, doc, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import glitchy from './images/glitchy.jpeg';
import { getLikes, updateLikes, } from './CreatePost';
import './PostBoard.css';

function PostBoard({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [likesAndDislikes, setLikesAndDislikes] = useState({});
  const [thumbsClickedState, setThumbsClickedState] = useState([]);


  const addState = (postId, upClicked, downClicked) => {
    const newState = {postId, upClicked, downClicked }
    // Check if the postId has been clicked and find post if it has
    const postClicked = getClickedPost(postId)
    if (postClicked) {
      postClicked.upClicked = upClicked
      postClicked.downClicked = downClicked
    }
    else {
      setThumbsClickedState(prevState => [...prevState, newState]);
    }
  }
 // Check if the postId has been clicked and find post if it has
  const getClickedPost = (postId) => {
      const postClicked = thumbsClickedState.find(post => post.postId === postId);
      if (postClicked === undefined) {
        return false
    }
      return postClicked;
  }

  const handleThumbsUpClick = async (postId) => {
    const postState = getClickedPost(postId)
    // const postClicked = thumbsClickedState.some(post => post.postId === postId);
    
    if (!postState) {
      updateLikes("like", postId);
      addState(postId, true, false)
    }
    else if (postState.upClicked != true) {
      updateLikes("like", postId);
      if (postState.downClicked == true) {
        //subtract 1 from dislike counter
        updateLikes("dislike", postId, -1)
      }
      addState(postId, true, false)
    }
  };

  const handleThumbsDownClick = async (postId) => {
    const postState = getClickedPost(postId)
    console.log(postState)
    console.log(postState['downClicked'])
    if (postState == false) {
      updateLikes("dislike", postId);
      addState(postId, false, true)
      console.log("uhuh")
      console.log(postState['downClicked'])
    }
    else if (postState.downClicked != true) {
      updateLikes("dislike", postId);
      if (postState.upClicked == true) {
        //subtract 1 from like counter
        console.log("subtract like")
        updateLikes("like", postId, -1)
      }
      addState(postId, false, true)
    }
  };



  useEffect(() => {
    document.body.style.backgroundColor = 'white'; // Change background color to black
    document.body.style.backgroundImage = `url(${glitchy})`;
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = '150px 80px';
    return () => {
      document.body.style.backgroundColor = ''; // Reset background color when component unmounts
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
    };
  }, []);

  const getPosts = async () => {
    try {
      const data = await getDocs(query(postsCollectionRef, orderBy("timestamp", "desc")));
      setPostList(
        data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };
  // const getPosts = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       query(postsCollectionRef, orderBy("timestamp", "desc"))
  //     );
  //     setPostList(
  //       querySnapshot.docs.map((post) => ({
  //         ...post.data(),
  //         id: post.id,
  //       }))
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    getPosts();
  };
  
  useEffect(() => {
    // Set up real-time listeners for each post
    const unsubscribe = postLists.map((post) => {
      const postDocRef = doc(db, 'posts', post.id);

      return onSnapshot(postDocRef, (doc) => {
        // MAKE THIS HAVE AN ANIMATION FOR CLICKING HERE
        if (doc.exists()) {
          const { likes, dislikes } = doc.data();
          // Update the likes and dislikes state for each post individually
          setLikesAndDislikes((prevLikesAndDislikes) => ({
            ...prevLikesAndDislikes,
            [post.id]: { likes: likes || 0, dislikes: dislikes || 0 },
          }));
        }
      });
    });

    // Cleanup the listeners when the component unmounts
    return () => {
      unsubscribe.forEach((unsubscribeFn) => unsubscribeFn());
    };
  }, [postLists]);

  useEffect(() => {
    console.log("Effect called");
    getPosts();
  }, []);
  return (
    <div className="homePage">
      {postLists.map((post) => {
        const { likes, dislikes } = likesAndDislikes[post.id] || { likes: 0, dislikes: 0 };
        const thumbs_up = getClickedPost(post.id).upClicked ? 'thumbs-up blue' : 'thumbs-up';
        const thumbs_down = getClickedPost(post.id).downClicked ? 'thumbs-down blue' : 'thumbs-down';
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> <em>{post.title}</em><br/>{post.artist}</h1>
              </div>
              <img src={post.albumArtUrl} className="albumArt"/>
           {/*<div className="deletePost">
              {isAuth && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  {" "}
                  &#128465;
                </button>
              )}
            </div>*/}
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <div className="footer">
              <h3>{post.author.name}</h3>
              <div className="thumbs">
              <IoMdThumbsUp className={thumbs_up} onClick={() => handleThumbsUpClick(post.id)}/>
              <span>{likes}</span>
              <IoMdThumbsDown className={thumbs_down} onClick={() => handleThumbsDownClick(post.id)}/>
              <span>{dislikes}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostBoard;