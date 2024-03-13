import React, { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  group: JSON.parse(localStorage.getItem("group")) || [],
};

const actionTypes = {
    UPDATE_GROUP: 'UPDATE_GROUP',
  };
  
  const GroupReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_GROUP:
        return {
          ...state,
          group: action.payload,
        };
      default:
        return state;
    }
  };

export const GroupContext = createContext(INITIAL_STATE);

const GroupContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GroupReducer, INITIAL_STATE);

  useEffect(() => {
    const storedGroupData = localStorage.getItem('group');
    if (storedGroupData) {
      const parsedGroupData = JSON.parse(storedGroupData);
      dispatch({ type: actionTypes.UPDATE_GROUP, payload: parsedGroupData });
    }
  }, []);

  const updateGroup = (newGroupData) => {
    dispatch({ type: actionTypes.UPDATE_GROUP, payload: newGroupData });
    localStorage.setItem('group', JSON.stringify(newGroupData));
  };

  return (
    <GroupContext.Provider
      value={{
        group: state.group,
        updateGroup
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextProvider;