import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
// import { Transition, TransitionGroup } from 'react-transition-group';
import { Toaster } from 'react-hot-toast';

import './App.css';
import { Admin, Private, Public } from './components/layout';
import { Login, Logout, Register } from './features/auth';
import {
  Overview,
  Users,
  Games,
  Banks,
  DepositHistory,
  WithdrawManagement,
  HistoryCron,
  Setting,
} from './features/admin';
import Deposit from './features/deposit';
import Home from './features/home';
import Profile from './features/profile';
import Contact from './features/contact';
import routes from './utils/routes';
import GiftCode from './features/admin/GiftCode';
import api from './api';

const disableF12 = () => {
  // Hàm ngăn chặn sự kiện mặc định của phím F12
  document.addEventListener(
    'keydown',
    function (e) {
      if (e.keyCode === 123) {
        e.preventDefault();
      }
    },
    false
  );

  // Hàm ngăn chặn sự kiện mặc định của chuột phải
  document.addEventListener(
    'contextmenu',
    function (e) {
      e.preventDefault();
    },
    false
  );

  // Hàm ngăn chặn các log messages trên console
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  // Hàm ngăn chặn sự kiện mặc định của chuột phải
  document.addEventListener(
    'contextmenu',
    function (e) {
      e.preventDefault();
    },
    false
  );
  // Hàm ngăn chặn sự kiện mặc định của các phím tắt (Ctrl + Shift + I)
  document.addEventListener(
    'keydown',
    function (e) {
      if (e.ctrlKey && e.shiftKey) {
        e.preventDefault();
      }
    },
    false
  );
};

function App() {
  const location = useLocation();

  disableF12();
  debugger;

  return (
    <div className="root">
      <Toaster position="top-center" reverseOrder={true} />

      <Routes location={location}>
        <Route path={routes.PUBLIC} element={<Public />}>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.LOGOUT} element={<Logout />} />
          <Route path={routes.REGISTER} element={<Register />} />
        </Route>

        <Route path={routes.PRIVATE} element={<Private />}>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.DEPOSIT} element={<Deposit />} />
          <Route path={routes.CONTACT} element={<Contact />} />
          <Route path={routes.PROFILE} element={<Profile />} />
        </Route>

        <Route path={routes.ADMIN} element={<Admin />}>
          <Route path={routes.OVERVIEW} element={<Overview />} />
          <Route path={routes.USER_MANAGEMENT} element={<Users />} />
          <Route path={routes.GAME_MANAGEMENT} element={<Games />} />
          <Route path={routes.SETTING_CRON} element={<Banks />} />
          <Route
            path={routes.DEPOSIT_MANAGEMENT}
            element={<DepositHistory />}
          />
          <Route
            path={routes.WITHDRAW_MANAGEMENT}
            element={<WithdrawManagement />}
          />
          <Route path={routes.HISTORY_CRON} element={<HistoryCron />} />
          <Route path={routes.SETTING} element={<Setting />} />
          <Route path={routes.GIFTCODE} element={<GiftCode />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
