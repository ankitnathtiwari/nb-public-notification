import React, { useState, useEffect } from "react";
import "./index.css";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";

export const SocialShare = ({ post, shareUrl }) => {
  return (
    <div className="social-share">
      <div>
        <WhatsappShareButton
          url={`${shareUrl}/?top=singlepost&id=${post._id}`}
          quote={post.title}
          title={post.title}
          hashtag="#newsbird"
        >
          <WhatsappIcon size={36} round={true} />
        </WhatsappShareButton>
      </div>

      <div>
        <FacebookShareButton
          url={`${shareUrl}/?top=singlepost&id=${post._id}`}
          quote={post.title}
          title={post.title}
          hashtag="#newsbird.live"
        >
          <FacebookIcon size={36} round={true} />
        </FacebookShareButton>
      </div>

      <div>
        <TwitterShareButton
          url={`${shareUrl}/?top=singlepost&id=${post._id}`}
          quote={post.title}
          title={post.title}
          hashtag="#newsbird"
        >
          <TwitterIcon size={36} round={true} />
        </TwitterShareButton>
      </div>

      <div>
        <LinkedinShareButton
          url={`${shareUrl}/?top=singlepost&id=${post._id}`}
          quote={post.title}
          title={post.title}
          hashtag="#newsbird"
        >
          <LinkedinIcon size={36} round={true} />
        </LinkedinShareButton>
      </div>

      <div>
        <TelegramShareButton
          url={`${shareUrl}/?top=singlepost&id=${post._id}`}
          quote={post.title}
          title={post.title}
          hashtag="#newsbird"
        >
          <TelegramIcon size={36} round={true} />
        </TelegramShareButton>
      </div>
    </div>
  );
};
