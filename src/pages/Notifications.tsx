import { IonContent, IonPage,IonList,IonItem, IonBadge,IonLabel } from '@ionic/react';
import { API } from '../data/ApiLinks';
import { useState,useEffect } from 'react';
import { checkLoginStatus, getUserName } from '../data/IonicStorage';
import axios from 'axios';
import AppHeader from '../components/AppHeader';

//not complete, do not edit code until completed
const Notifications: React.FC = () => {
  
  const [notificationData,setNotificationData] = useState<any>([])
  const [linkHash, setLinkHash] = useState<string>("")
    
  
  
  const getNotifications= (username:string) => {
    if(username !== ""){
    axios.get(`${API}/history/${username}/0`).then((res)=>{
      if(res.status === 200) {
        setNotificationData(res.data)
        console.log(res.data)
      }else{
        //resolve errors
        console.log("Not A complete error")
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
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
