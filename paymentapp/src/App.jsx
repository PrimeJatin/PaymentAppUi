import { useState } from "react";
import {PaymentAppUI} from './PaymentApp/First'
import LoginContent from "./PaymentApp/LoginContent";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  if (!isLoggedIn) {
    return <LoginContent handleLogin={handleLogin} />;
  }

  return (
    <PaymentAppUI
      handleLogout={handleLogout}
      setView={setCurrentView}
      currentView={currentView}
    />
  );
}