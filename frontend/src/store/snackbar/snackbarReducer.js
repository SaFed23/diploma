/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  notifications: [],
};

export default {
  addNotification: (state, action) => {
    state.notifications = [
      ...state.notifications,
      {
        key: new Date().getTime() + Math.random(),
        ...action.payload,
      },
    ];
  },

  closeNotification: (state, action) => {
    state.notifications = state.notifications.map(notification => (
      (action.payload.dismissAll || notification.key === action.payload.key)
        ? { ...notification, dismissed: true }
        : { ...notification }
    ));
  },

  removeNotification: (state, action) => {
    state.notifications = state.notifications.filter(
      notification => notification.key !== action.payload,
    );
  },
};
