import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import moment from "moment";
import { appConfig } from "../app-config/index";
import { Link } from "react-router-dom";
import { SocialShare } from "../social-share";
import { SocialShareButton } from "../social-share-button";

export const Post = ({ post }) => {
  return (
    <div className="post">
      <img
        src={`${appConfig.url.image}/${
          post.image[0] === "/" ? post.image.substr(1) : post.image
        }`}
        alt="News Image"
      />

      <h2 className="post-title">
        <Link to={`/posts?top=singlepost&id=${post._id}`}>{post.title}</Link>
      </h2>

      <p className="post-para">{post.content}</p>
      <div className="post-date-share-author">
        <div className="post_date">
          {moment(post.pub_date).startOf("hours").fromNow()}
          {post.authorName ? <p>{`by ${post.authorName}`}</p> : null}
        </div>
        <div className="post-social-share-button">
          <SocialShareButton
            post={post}
            shareUrl={`${appConfig.url.share}/posts`}
          />
        </div>
      </div>
    </div>
  );
};
