import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import AccountConfirmation from "./components/Auth/AccountConfirmation/AccountConfirmation";
import LinkExpired from "./components/Auth/LinkExpired/LinkExpired";
import ActivatePage from "./components/Auth/ActivateAccount/ActivatePage";
import Dashboard from "./pages/DashboardPage";
import CreateGiftcard from "./pages/CreateGiftcard";
import RedeemGiftcard from "./pages/RedeemGiftcardPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { ChakraProvider } from "@chakra-ui/react";
import { GiftCardProvider } from "./components/Context/GiftCardContext";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <ChakraProvider>
    <GiftCardProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateGiftcard />} />
        <Route path="/redeem" element={<RedeemGiftcard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/confirm-email" element={<AccountConfirmation />} />
        <Route path="/link-expired/" element={<LinkExpired />} />
        <Route path="/verify-access/:token" element={<ActivatePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </GiftCardProvider>
    </ChakraProvider>
  );
};

export default App;
