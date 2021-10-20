import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { uiActions } from "../../store/slice/ui-slice";

import classes from "./Notification.module.css";

//section with notifcation/alerts
const Notification = (props) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  /*
if the notification state changes, checks whether the notification.status is error or success 
After the interval of 2000ms the uiAction.removeNotification action is dispatched
to remove the notification
*/
  let cssClasses = `${classes.notification}`;

  if (props.status === "error") {
    cssClasses = `${classes.notification} ${classes.error}`;
  }
  if (props.status === "success") {
    cssClasses = `${classes.notification} ${classes.success}`;
  }

  useEffect(() => {
    //if the notification.status is error or success then notification is removed after 2000ms 
    if (notification.status === "error" || notification.status === "success") {
      const interval = setInterval(() => {
        dispatch(uiActions.removeNotification());
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [notification.status]);

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
