import { IonContent, IonPage } from '@ionic/react';
import AppHeader from '../components/AppHeader';

const Wallet: React.FC = () => {
  return (
    <IonPage>
      <AppHeader/>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Wallet;
