import { IonContent, IonPage, IonText } from '@ionic/react';
import AppHeader from '../components/AppHeader';
import goBack  from '../components/BackButton';


const Trends: React.FC = () => {
  return (
    <IonPage>
      <AppHeader/>
      <IonContent fullscreen>
      {goBack("Explore")} 
        <hr/>
        IonCon
      
          <IonText>
            <h5>Trends</h5>
          </IonText>
         
        
      </IonContent>
    </IonPage>
  );
};

export default Trends;
