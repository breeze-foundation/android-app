import { IonContent, IonPage } from '@ionic/react';
import AppHeader from '../components/AppHeader';
import goBack  from '../components/BackButton';


const Trends: React.FC = () => {
  return (
    <IonPage>
      <AppHeader/>
      <IonContent fullscreen>
      {goBack("Explore")} 
        <hr/>
        
      </IonContent>
    </IonPage>
  );
};

export default Trends;
