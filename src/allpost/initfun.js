export const initFun = (url) => {
  return {
    page: 1,
    topic: "allpost",
    method: "GET",
    loading: false,
    initLoading: true,
    err: false,
    message: "",
    posts: [],
    pageChange: false,
    singlePost: false,
  };
};
