import React, { useState, useEffect } from "react";
import { NavSide } from "../nav-side";
import { NavTop } from "../nav-top";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import ShortVideos from "../short-videos";
import "./index.css";
import { AllPost } from "../allpost";
import { BottomNav } from "../bottom-nav";
import ReactGA from "react-ga";
import axios from "axios";
import { appConfig } from "../app-config";
import { VideoPostList } from "../video-post-list";
import { VideoParams } from "../item-routing";
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";

export const globalContext = React.createContext();
import { Capacitor } from "@capacitor/core";
import { async } from "regenerator-runtime";

const isPushNotificationsAvailable =
  Capacitor.isPluginAvailable("PushNotifications");
const pushReg = async () => {
  return await Capacitor.registerPlugin("PushNotifications");
};
console.log("sddsfffs", pushReg());
pushReg();
export const App = () => {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState({ _id: "", username: "", auth: false });
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const handleSidebar = (item) => setSidebar(item);

  const register = () => {
    console.log("InitializingYDUDUDJY HomePage React");

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener("registration", (token) => {
      console.log(token.value);
      createEndPointAndSubscribe(token);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error) => {
      alert("Error on registration: " + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log(notification, "notification received");
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log(notification, "notification clicked");
      }
    );
  };

  const createEndPointAndSubscribe = async (token) => {
    console.log("token value in create endpoint", token.value);
    const data = await axios({
      method: "post",
      url: `${appConfig.url.api}/public/register_token?deviceToken=${token.value}`,
      withCredentials: true,
    });
    console.log(data);
  };

  useEffect(() => {
    PushNotifications.checkPermissions().then((res) => {
      console.log(res, "push notification permission response");
      if (res.receive !== "granted") {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === "denied") {
          } else {
            register();
          }
        });
      } else {
        register();
      }
    });

    const initAuthVerification = async () => {
      const data = await axios({
        method: "get",
        url: `${appConfig.url.api}/auth/publicAuth`,
        withCredentials: true,
      });

      if (data.data.status) {
        setUser(data.data.user);
      }
    };

    initAuthVerification();
    ReactGA.initialize(appConfig.analytics.google);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <globalContext.Provider
      value={{ user, setUser, openModal, setOpenModal, sidebar }}
    >
      <BrowserRouter>
        <div className="app">
          <NavTop sidebar={sidebar} handleSidebar={handleSidebar} />
          <div className="app-content" onClick={() => handleSidebar(false)}>
            <NavSide />
            <Switch>
              <Route path="/videos">
                <VideoPostList />
              </Route>
              <Route path="/posts">
                <AllPost />
              </Route>
              <Route exact path="/">
                <Redirect to="/videos" />
              </Route>
            </Switch>
          </div>

          <BottomNav />
        </div>
      </BrowserRouter>
    </globalContext.Provider>
  );
};
