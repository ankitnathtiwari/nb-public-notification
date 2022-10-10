import { useEffect, useState } from "react";
import axios from "axios";
import { appConfig } from "../app-config";
import regeneratorRuntime from "regenerator-runtime";

const fetchData = async (top, page, videoPostId) => {
  const url = `${appConfig.url.api}/public/video?top=${top}&&page=${page}&&id=${videoPostId}`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    return { status: true, data: res.data.videoPosts };
  } catch (err) {
    return { status: false, data: err.message };
  }
};

export const useFetch = (
  propTopic,
  page,
  setPage,
  videoPostId,
  followingUser,
  user
) => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [topic, setTopic] = useState("allpost");

  const getVideoList = async (propTopic, page, videoPostId) => {
    const result = await fetchData(propTopic, page, videoPostId);

    if (result.status) {
      setVideoList(result.data);
      setLoading(false);
    } else {
      setErr(true);
      setLoading(false);
    }
  };

  const getVideoListOnPageChange = async (propTopic, page) => {
    const result = await fetchData(propTopic, page);
    if (result.status) {
      setVideoList([...videoList, ...result.data]);
      setLoading(false);
    } else {
      setErr(true);
      setLoading(false);
    }
  };

  if (propTopic !== topic) {
    setPage(1);
    setTopic(propTopic);
  }
  // followingUser
  useEffect(() => {
    if (!user.auth) {
      const newList = videoList.map((item) => {
        return { ...item, followStatus: false };
      });
      console.log(newList, "new video list");
      setVideoList(newList);
    } else {
      setVideoList(
        videoList.map((item) => {
          if (item.user === followingUser.user) {
            if (followingUser.status) {
              item.followStatus = true;
              return item;
            } else {
              item.followStatus = false;
              return item;
            }
          }
          return item;
        })
      );
    }
    return () => {};
  }, [followingUser, user.auth]);

  useEffect(() => {
    getVideoList(propTopic, page, videoPostId);
    return () => {};
  }, [topic]);

  useEffect(() => {
    if (page > 1) {
      getVideoListOnPageChange(propTopic, page);
    }
    return () => {};
  }, [page]);
  console.log({ videoList }, "inside usefetch");
  return [videoList, loading, err];
};
