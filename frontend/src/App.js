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
import SplashPage from "./components/SplashPage";
import Loading from "./components/Loading";
import About from "./components/About";
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from "./components/ResetPassword";

import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChangeOrder, setShowChangeOrder] = useState(false);
  const [show, setShow] = useState(false);

  const lists = useSelector((state) =>
    Object.values(state?.listReducer?.changeList)
  );
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation isLoaded={isLoaded} />
      <div className="content-container">
        <Switch>
          <Route exact path="/">
            {user ? (
              <div className="dashboard-Container-app ">
                {lists.length <= 1 ? (
                  ""
                ) : (
                  <ChangeOrderModal
                    lists={lists}
                    setShowChangeOrder={setShowChangeOrder}
                    showChangeOrder={showChangeOrder}
                  />
                )}
                <DashBoardLists />
                <MapleNews />
              </div>
            ) : (
              <SplashPage />
            )}
          </Route>
          <Route exact path="/lists/:listId">
            {show ? (
              Loading
            ) : (
              <div className="single-list-Div mt-5">
                <UsersLists />
                <List setShow={setShow} />
              </div>
            )}
          </Route>
          <Route exact path="/About">
            <About />
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
            <div className="flex justify-center ">
              <SignupFormPage />
            </div>
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path='/fp'>
            <ForgotPassword />
          </Route>
          <Route exact path='/resetpassword/:token'>
            <ResetPassword />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
