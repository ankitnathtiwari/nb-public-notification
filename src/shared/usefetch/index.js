import React, { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [url]);

  return [posts, err, loading];
};
