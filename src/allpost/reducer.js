import {
  topicChange,
  pageChange,
  handleLoadMore,
  handleQuery,
  handleErr,
} from "./eventHandlers";

export const reducer = (state, action) => {
  switch (action.type) {
    case "PAGE_CHANGE":
      return pageChange(state, action);
    case "TOPIC_CHANGE":
      return topicChange(state, action);
    case "LOAD_MORE":
      return handleLoadMore(state, action);
    case "QUERY_CHANGE":
      return handleQuery(state, action);
    case "ERR":
      return handleErr(state, action);
    default:
      throw new Error();
  }
};
