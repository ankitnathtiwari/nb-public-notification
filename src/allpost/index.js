import React, { useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import { initFun } from "./initfun";
import { useRouteMatch } from "react-router";
import { useFetch } from "./useFetch";
import "./index.css";
import { Post } from "../post/index";
import { Button } from "../shared/button";
import { useLocation } from "react-router-dom";
import { Loading } from "../shared/loading";
import { topics } from "../app-config/index";

export const AllPost = () => {
  const { search } = useLocation();

  const [state, dispatch] = useReducer(reducer, search, initFun);
  useFetch(state, dispatch, search);

  console.log("all post render");
  if (state.posts.length === 0) {
    if (state.loading || state.initLoading) {
      return (
        <div className="loading-component">
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="loading-component">
          <h3>No Post to Show</h3>
        </div>
      );
    }
  } else {
    return (
      <div className="post-list">
        {state.posts.map((post) => {
          return (
            //            <div  className='post-list'>
            <Post post={post} key={post._id} />
            //          </div>
          );
        })}

        {state.posts.length < 5 ? null : (
          <Button onClick={() => dispatch({ type: "LOAD_MORE" })}>
            Load More
          </Button>
        )}
      </div>
    );
  }
};
