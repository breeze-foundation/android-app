import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { notificationsOutline, walletOutline, personOutline, readerOutline, analyticsOutline, ellipsisHorizontalCircleOutline } from 'ionicons/icons';
import Feed from './pages/Feed';
import Notifications from './pages/Notifications';
import Wallet from './pages/Wallet';
import Trends from './pages/Trends';
import Profile from './pages/Profile';
import More from './pages/More';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import { checkLoginStatus } from './data/IonicStorage';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import SinglePostPage from './pages/SinglePost';

setupIonicReact();

const App: React.FC = () => {

  const [userLoggedIn, setUserLoggedInStatus] = useState(false);

  useEffect(() => {

    const checkLogin = async () => {
      const status = await checkLoginStatus()
      setUserLoggedInStatus(status);
    }

    if(!userLoggedIn) checkLogin()

  }, [userLoggedIn])

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/feed">
              <Feed />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/profile">
              <Profile globalLoginStatus={userLoggedIn} />
            </Route>
            <Route path="/trends">
              <Trends />
            </Route>
            <Route path="/more">
              <More setLoginStatusGlobal={setUserLoggedInStatus} />
            </Route>
            <Route path="/login">
              <LoginPage setLoginStatusGlobal={setUserLoggedInStatus} />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/singlepost">
              <SinglePostPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/feed" />
            </Route>

          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/feed">
              <IonIcon icon={readerOutline} />
            </IonTabButton>
            {userLoggedIn ? (
              <IonTabButton tab="tab2" href="/notifications">
                <IonIcon icon={notificationsOutline} />
              </IonTabButton>
            ) : null}
            {userLoggedIn ? (
              <IonTabButton tab="tab3" href="/wallet">
                <IonIcon icon={walletOutline} />
              </IonTabButton>
            ) : null}
            {userLoggedIn ? (
              <IonTabButton tab="tab4" href="/profile">
                <IonIcon icon={personOutline} />
              </IonTabButton>
            ) : null}
            <IonTabButton tab="tab5" href="/trends">
              <IonIcon icon={analyticsOutline} />
            </IonTabButton>
            <IonTabButton tab="tab6" href="/more">
              <IonIcon icon={ellipsisHorizontalCircleOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
