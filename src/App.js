import React from 'react';
import NavigationBar from './components/NavigationBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import NotificationList from './components/NotificationList'
import ChatList from './components/ChatList'
import Conversation from './components/Conversation'
import LibraryList from './components/LibraryList'
import Landing from './components/Landing';
import CreateNotice from './components/CreateNotice';
import PageNotFound from './components/PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/notifications" component={NotificationList} />
        <Route path="/chats" component={ChatList} />
        <Route path="/chat/:id" component={Conversation} />
        <Route path="/library" component={LibraryList} />
        <Route path="/create" component={CreateNotice} />
        <Route path="/*" component={PageNotFound} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
