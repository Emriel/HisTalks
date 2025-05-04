import React from 'react';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import AppLayout from './components/AppLayout';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<AppLayout />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;