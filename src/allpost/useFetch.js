import { useEffect } from "react";
import axios from "axios";
import { appConfig } from "../app-config";

const getDataOnPageChange = (url, topic, dispatch) => {
  axios
    .get(url, { withCredentials: true })
    .then((res) => {
      dispatch({ type: "PAGE_CHANGE", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "ERR" });
    });
};

export const useFetch = (state, dispatch, query) => {
  if (query.length === 0) {
    query = "?top=allpost";
  }
  let searchParams = new URLSearchParams(query);
  const topic = searchParams.get("top");

  const url = `${appConfig.url.api}/public/post${query}&page=${state.page}`;

  useEffect(() => {
    if (topic !== state.topic) {
      return dispatch({ type: "TOPIC_CHANGE", payload: topic });
    }
    getDataOnPageChange(url, topic, dispatch);

    return () => {};
  }, [state.page, topic, state.topic]);
};
