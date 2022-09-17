import { IonContent, IonPage,IonList,IonItem, IonBadge,IonLabel, IonGrid, IonRow, IonCol, IonButton, IonText, IonToast } from '@ionic/react';
import { API } from '../data/ApiLinks';
import { useState,useEffect } from 'react';
import { checkLoginStatus, getUserName } from '../data/IonicStorage';
import GoBack from '../components/BackButton';
import axios from 'axios';
import AppHeader from '../components/AppHeader';

//not complete, do not edit code until completed
const Notifications: React.FC = () => {
  const [user,setUser] = useState<string>("");
  const [notificationData,setNotificationData] = useState<any>([])
  const [readText,setReadText] = useState<string>("Mark As Read")
  const [toast,setToast] = useState<boolean>(false)
  const [toastText,setToastText] = useState<string>("Marked all as Read")
    
  
  
  const getNotifications= (username:string) => {
    if(username !== ""){
      axios.get(`${API}/history/${username}/0`).then((res)=>{
        if(res.status === 200) {
          setNotificationData(res.data)
          setUser(username)
          console.log(res.data)
        }else {
          //resolve errors
          console.log("Not A complete error")
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

  //To add mark as read function
  const MarkAsRead=()=>{
    setReadText("Marking...")
    if(user !== ""){
      axios.get(`${API}/unreadnotifycount/${user}`).then((res)=>{
        if(res.status === 200 && res.data.count===0) {
          setToastText("No unread notifications")
          setToast(true)
          setReadText("Mark As Read")
        }else if(res.status === 200 && res.data.count<0){
          setToastText("Marked as read")
          setToast(true)
          setReadText("Mark As Read")
        }
        
      }).catch((error)=>{
        console.log(error)
      })
  }
    
  }
  useEffect(()=>{
    const checkLogin=async()=>{
      let username:any = await getUserName();
      let status:any = await checkLoginStatus()
      
      const loadContentBasedOnLoginStatus=(username:string)=>{ 
        if(status === true && username !== undefined){
          getNotifications(username)
        }
        //add else and redirect user to login page
        //add network unavailable component
        
      }
      loadContentBasedOnLoginStatus(username)
      
    }  
    checkLogin()
  },[])


  return (
    <IonPage>
      <AppHeader/>
      <IonContent fullscreen>
        <IonItem>
          {GoBack("Notifications")}
        </IonItem>
        <IonGrid>
          <IonRow class="ion-text-center">
            <IonCol>
              <IonText color="primary" className='text-center'>Activity</IonText>
            </IonCol>
            
          </IonRow>
          <IonRow >
            <IonCol class='ion-text-center'>
              <IonButton onClick={() => MarkAsRead()}>{readText}</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
           
        <IonList>
            {notificationData.map((res:any)=>{
              //check if we need to view link details
              let linkDetails:any;
              // if(res.types === 2){
              //   linkDetails = <>@{res.data.author}/{res.data.link}</>
              // }else{
              //   linkDetails="40"
              // }


              //store sliced hash here
              let hashed:any;
              
              if (res.hash !== ""){
                hashed = res.hash;
                hashed = <IonBadge onClick={()=>{

                }}> {hashed.slice(0,6)}</IonBadge>
              }

              //change types to specific words
              if(res.type===4){
                linkDetails = <>{res.sender} shared new post @{res.data.author}/{res.data.link} {hashed}</>
              }
              if(res.type===5){
                linkDetails = <>{res.sender} upvoted @{res.data.author}/{res.data.link} {hashed}</>
                
              }
              if(res.type===6){
                // res.type="updated profile"
                linkDetails = <>{res.sender} updated profile {hashed}</>
              }
              if(res.type===14){
                linkDetails = <>@{res.sender} transferred {res.data.amount} VP to @{res.data.receiver} {hashed}</>

                
              }
              if(res.type===15){
                
                linkDetails = <>@{res.sender} transferred {res.data.amount} bytes to @{res.data.receiver} {hashed}</>
                
              }

              if(res.type===28){
                linkDetails = <>{res.sender} checked notifications {hashed}</>
              }
              return(
                <IonItem  key={res.ts}>{linkDetails}</IonItem>
              )
            })}
         </IonList>
         <IonToast  isOpen={toast} 
                    position="top"
                    message={toastText}
                    onDidDismiss={()=>setToast(false)}
                    buttons={["OK"]}
          />
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
