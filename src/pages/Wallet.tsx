import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonList, IonPage, IonRow, IonText } from '@ionic/react';
import { flash, people } from 'ionicons/icons';
import AppHeader from '../components/AppHeader';
import GoBack from '../components/BackButton';
import { getUserName } from '../data/IonicStorage';

const Wallet: React.FC = () => {
  const pageData = async()=>{
    
  };
  return (
    <IonPage>
      <AppHeader/>
      <IonContent fullscreen>
          {GoBack("Wallet")}
          <hr/>
        <IonGrid>
          <IonRow class="ion-text-center">
            <IonCol>
              <IonText><h1>2.2347</h1></IonText>
              <IonText><b>TMAC</b></IonText>
            </IonCol>
          </IonRow>
          <IonRow class="ion-text-center">
            <IonCol>
              <IonButton expand="block">Transfer</IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block">Withdraw</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonText  className="ion-text-center" color="primary"><p>Add TMAC to MetaMask</p></IonText>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText>
                  <p><IonIcon icon={flash}/><b>Income Today</b></p>
                </IonText>
              </IonCol>
              <IonCol class='ion-text-end'>
                <IonText>
                  <p>0</p>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>
                  
                  <p><IonIcon icon={people}/> <b>My Affiliates</b></p>
                </IonText>
              </IonCol>
              <IonCol class='ion-text-end'>
                <IonText>
                  <p>0</p>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        <hr/>
        <IonGrid>
          <IonText>
            <p><b>My Affilate Link</b></p> 
          </IonText>
          <IonText color="primary">
             <p className='primary'>https://tipmeacoffee.com/welcome/username</p>
          </IonText>
          <IonText>
            <p>You earn 0.05 TMAC for each like on the posts of your referrals</p>
          </IonText> 
        </IonGrid>
        <hr />
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText><p><b>Boost Posts</b></p></IonText>
              <IonText>
                <p>
                  You can boost any of your posts to top rankings on 
                  TipMeACoffee main page by bidding. Your post will remain 
                  ranked untill it becomes a day old from the time of posting.
                </p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow class='ion-text-center'>
            <IonCol>
              <IonButton>
                Boost
              </IonButton>
            </IonCol>
          </IonRow>
          
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Wallet;
