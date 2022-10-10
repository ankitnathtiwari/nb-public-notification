export const pageChange = (state, action) => {
  return {
    ...state,
    loading: false,
    initLoading: false,
    posts: [...state.posts, ...action.payload.postFeed],
  };
};
export const topicChange = (state, action) => {
  return {
    ...state,
    loading: true,
    initLoading: false,
    topic: action.payload,
    page: 1,
    posts: [],
  };
};

export const handleLoadMore = (state, action) => {
  return {
    ...state,
    page: state.page + 1,
    loading: true,
  };
};

export const handleQuery = (state, action) => {
  return {
    ...state,
    posts: [],
    page: 1,
    loading: true,
  };
};
export const handleErr = (state, action) => {
  return {
    ...state,
    loading: false,
    initLoading: false,
  };
};
