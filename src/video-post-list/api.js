import axios from "axios";
import { appConfig } from "../app-config";

export const fetchData = async (query) => {
  const url = `${appConfig.url.api}/public/video?top=${query.topic}&&page=${query.page}&&id=${query.itemId}`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    console.log({ res });
    return { status: true, data: res.data.videoPosts };
  } catch (err) {
    return { status: false, data: err.message };
  }
};
