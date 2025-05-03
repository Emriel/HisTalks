import React from 'react';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import AppLayout from './components/AppLayout';
import Footer from './components/Footer';

function App() {
  return (
    <ChatProvider>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <AppLayout />
        <Footer />
      </div>
    </ChatProvider>
  );
}

export default App;