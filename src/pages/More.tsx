import { IonContent, IonPage, IonItem, IonLabel, IonList, IonIcon, IonButton } from '@ionic/react';
import { help, information, logIn, logOut, moon } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AppHeader from '../components/AppHeader';
import { checkLoginStatus, logoutUser } from '../data/IonicStorage';


interface moreProps {
  setLoginStatusGlobal?: any
}

const More: React.FC<moreProps> = (props: moreProps) => {

  const [userLoggedIn, setUserLoggedInStatus] = useState(false);

  const history = useHistory();

  const setLoginStatusGlobal = props.setLoginStatusGlobal;

  useEffect(() => {

    const checkLogin = async () => {
      if(userLoggedIn === true) return
      const status = await checkLoginStatus()
      if (status) {
        setLoginStatusGlobal(true)
        setUserLoggedInStatus(status);
      }
    }
    checkLogin();
  })

  const handleLogOut = async () => {
    await logoutUser();
    setUserLoggedInStatus(false);
    setLoginStatusGlobal(false);
    history.push('/login');
  }

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen className="ion-padding">
        <IonList>
          <IonItem>
            <IonIcon icon={help}></IonIcon>
            <IonLabel>Help</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={information}></IonIcon>
            <IonLabel>Explorer</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={moon}></IonIcon>
            <IonLabel>Display</IonLabel>
          </IonItem>
        </IonList>
        {userLoggedIn ? (
          <div className="ion-text-center">
            <IonButton onClick={() => handleLogOut()} color="danger">
              <IonIcon icon={logOut}></IonIcon>
              <IonLabel>Logout</IonLabel>
            </IonButton>
          </div>
        ) : (
          <div className="ion-text-center">
            <IonButton routerLink="/login">
              <IonIcon icon={logIn}></IonIcon>
              <IonLabel>Login</IonLabel>
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default More;
