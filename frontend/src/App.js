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
import MapleNews from "./components/MapleNews";
import LoginFormPage from "./components/LoginFormPage";
import LoadingList from "./components/Lists/LoadingList";
import ChangeOrderModal from "./components/Modals/ChangeOrderModal/ChangeOrderModal";
import "./index.css";

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
          <div className="dashboard-Container-app ">
            <ChangeOrderModal
              lists={lists}
              setShowChangeOrder={setShowChangeOrder}
              showChangeOrder={showChangeOrder}
            />
            <h3 className="bg-red-900">Testing! Hello from Tailwind CSS</h3>
            <DashBoardLists />
          </div>
        </Route>
        <Route exact path="/lists/:listId">
          <div className="single-list-Div">
            <UsersLists />
            <List />
          </div>
        </Route>
        <Route exact path="/lists/:listId/edit">
          <EditFormList />
        </Route>
        <Route exact path="/LoadCharacter">
          <LoadingList />
        </Route>
        <Route exact path="/CreateList">
          <ListForm />
        </Route>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
