import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Modal } from "./context/Modal";
import List from "./components/Lists/List";
import Footer from "./components/Footer";
import ListForm from "./components/Lists/ListForm";
import DashBoardLists from "./components/Lists/DashBoardLists";
import UsersLists from "./components/Lists/Lists";
import EditFormList from "./components/Lists/EditList";
import SignupFormPage from "./components/SignupFormPage";
import ChangeOrder from "./components/ChangeOrder";
import { storingChangeList } from "./store/list";
import MapleNews from "./components/MapleNews";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChangeOrder, setShowChangeOrder] = useState(false);

  const lists = useSelector((state) =>
    Object.values(state?.listReducer?.changeList)
  );
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <div className="dashboard-Container-app">
            <button
              className="changeOrder-button"
              onClick={(e) => {
                e.preventDefault();
                setShowChangeOrder(!showChangeOrder);
                if (!showChangeOrder) {
                  dispatch(storingChangeList({ lists, type: "open" }));
                } else {
                  dispatch(storingChangeList({ lists, type: "close" }));
                }
              }}
            >
              Change Order
            </button>
            {showChangeOrder ? (
              <ChangeOrder
                lists={lists}
                setShowChangeOrder={setShowChangeOrder}
                showChangeOrder={showChangeOrder}
              />
            ) : null}
            <DashBoardLists />
          </div>
        </Route>
        <Route exact path="/lists/:listId">
          <div className="single-list-Div">
            <List />
            <UsersLists />
          </div>
        </Route>
        <Route exact path="/lists/:listId/edit">
          <EditFormList />
        </Route>
        <Route exact path="/CreateList">
          <ListForm />
        </Route>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
