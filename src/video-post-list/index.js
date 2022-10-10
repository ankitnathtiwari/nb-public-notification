import React, { useEffect, useState, useContext } from "react";
import { fetchData } from "./api";
import { useLocation } from "react-router";
import { Button } from "../shared/button";
import { ReactVideo } from "../react-video";
import { globalContext } from "../app";
import "./index.css";
import { PopUpModal } from "../shared/pop-up-modal";
import { LoginModal } from "../login-modal";
import { Loading } from "../shared/loading";

export const VideoPostList = () => {
  let searchParams = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const topic = searchParams.get("top");
  const id = searchParams.get("id");
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1);
  const [previousQuery, setPreviousQuery] = useState({
    topic: topic ? topic : "allpost",
    id: id,
    page: 1,
  });
  const { user, setUser, openModal, setOpenModal, sidebar } =
    useContext(globalContext);

  const handlePageChange = () => {
    setPage(page + 1);
    const queryItem = {
      topic: topic ? topic : "allpost",
      id: id,
      page: page + 1,
    };
    const getList = async () => {
      const data = await fetchData(queryItem);
      console.log({ data });
      if (data.status) {
        console.log([...itemList, ...data.data], "video posts after api call");
        setItemList([...itemList, ...data.data]);
      }
    };
    return getList();
  };

  const handleUserFollow = (followingUser) => {
    setItemList(
      itemList.map((item) => {
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
  };

  useEffect(() => {
    if (previousQuery.topic !== topic) {
      setPreviousQuery({ ...previousQuery, topic: topic, page: 1 });
      const queryItem = {
        topic: topic ? topic : "allpost",
        id: id,
        page: 1,
      };
      const getList = async () => {
        setLoading(true);
        const data = await fetchData(queryItem);
        if (data.status) {
          setItemList([...data.data]);
          setLoading(false);
        }
      };
      return getList();
    }

    if (id) {
      setPreviousQuery({ ...previousQuery, id: id, page: 1 });
      const queryItem = { topic: topic, itemId: id, page: 1 };
      const getList = async () => {
        setLoading(true);
        const data = await fetchData(queryItem);
        if (data.status) {
          setItemList([...data.data]);
          setLoading(false);
        }
      };
      return getList();
    }

    const queryItem = { topic: topic || "allpost", id: id, page: page };
    const getList = async () => {
      setLoading(true);
      const data = await fetchData(queryItem);
      if (data.status) {
        setItemList([...data.data]);
        setLoading(false);
      }
    };
    return getList();
  }, [topic, id, user.auth]);

  if (loading) {
    return (
      <div className="short-videos">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div
        className={
          openModal || sidebar ? "short-videos-filter" : "short-videos"
        }
      >
        {itemList.map((item) => {
          return (
            <div key={item._id}>
              <ReactVideo item={item} handleUserFollow={handleUserFollow} />
            </div>
          );
        })}
        <div className="load-more-button">
          <Button onClick={handlePageChange}>Load More</Button>
        </div>
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal}>
        <LoginModal setOpenModal={setOpenModal} />
      </PopUpModal>
    </>
  );
};
