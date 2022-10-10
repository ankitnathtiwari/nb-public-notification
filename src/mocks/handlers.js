import { rest } from "msw";
import { posts1, posts2, posts3 } from "./posts";
import fakeimage from "./images/fakeimage.jpg";
import regeneratorRuntime from "regenerator-runtime";
import { appConfig } from "../app-config";
import { videoPosts1, videoPosts2, videoPosts3 } from "./videoPosts";
//   req.url.searchParams.get("page"),
//   req.url.searchParams.get("top")

export const handlers = [
  rest.get(appConfig.url.api, (req, res, ctx) => {
    if (req.url.searchParams.get("top") === "singlepost") {
      let post = posts1.filter(
        (item) => item._id === Number(req.url.searchParams.get("id"))
      );
      return res(ctx.json(post));
    }

    if (req.url.searchParams.get("page") == 1) {
      return res(ctx.json(posts1));
    }
    if (req.url.searchParams.get("page") == 2) {
      return res(ctx.json(posts2));
    }
    if (req.url.searchParams.get("page") == 3) {
      return res(ctx.json(posts3));
    }
    return res(ctx.json([]));
  }),

  rest.get(
    `${appConfig.url.api}/video/allvideo?top=allpost&&page=1&&id=null`,
    (req, res, ctx) => {
      if (req.url.searchParams.get("top") === "singlepost") {
        let post = posts1.filter(
          (item) => item._id === Number(req.url.searchParams.get("id"))
        );
        return res(ctx.json(post));
      }

      if (req.url.searchParams.get("page") == 1) {
        return res(ctx.json(videoPosts1));
      }
      if (req.url.searchParams.get("page") == 2) {
        return res(ctx.json(videoPosts2));
      }
      if (req.url.searchParams.get("page") == 3) {
        return res(ctx.json(videoPosts3));
      }
      return res(ctx.json([]));
    }
  ),

  rest.get(`${appConfig.url.image}/fakeimage.jpg`, async (_, res, ctx) => {
    // Convert "base64" image to "ArrayBuffer".
    const imageBuffer = await fetch(fakeimage).then((res) => res.arrayBuffer());

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      ctx.body(imageBuffer)
    );
  }),

  rest.get(`http://localhost:8080/nb_logo_2.png`, async (_, res, ctx) => {
    // Convert "base64" image to "ArrayBuffer".
    const imageBuffer = await fetch(fakeimage).then((res) => res.arrayBuffer());

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      ctx.body(imageBuffer)
    );
  }),
];
