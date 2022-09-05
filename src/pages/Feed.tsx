import { IonCol, IonContent, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonRow, RefresherEventDetail } from '@ionic/react';
import axios from 'axios';
import { API } from '../data/ApiLinks';
import moment from 'moment';
import { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';
import { checkLoginStatus, getUserName } from '../data/IonicStorage';
// import getTags from '../data/tags';
import { Content } from '../model';
import PostDetail from './elements/PostDetail';
import { chevronDownCircleOutline } from 'ionicons/icons';

//now imported as a component
//const API = process.env.API_URL || 'https://api.breezechain.org';

interface feedProps {
  // setLoginStatusGlobal?: any
  globalLoginStatus?: boolean
}

const Feed: React.FC<feedProps> = (props: feedProps) => {

  const [currentState, setCurrentState] = useState<any>({
    feedPosts: undefined,
    dataLoaded: false,
    loggedInUsername: undefined,
    currentAccount: undefined,
    currentLoggedInStatus: false,
    feedType: 'public'
  });

  const loadContentForLoggedInUser = async (username: string) => {
    let postsAPI = await axios.get(API + `/categoryfeed/${username}`);
    // need to add token check
    let userAPI = await axios.get(API + `/account/${username}`);
    // setCurrentAccount(userAPI.data)
    // let nTags = await getTags();

    let promotedAPI = await axios.get(API + `/promoted`);
    let promotedData = [];
    let finalPosts = postsAPI.data;

    if (promotedAPI.data.length > 0) promotedData = promotedAPI.data.slice(0, 3).map((x: any) => ({ ...x, __promoted: true }));
    if (promotedData.length > 0) finalPosts.splice(1, 0, promotedData[0]); if (promotedData.length > 1) finalPosts.splice(5, 0, promotedData[1]); if (promotedData.length > 2) finalPosts.splice(10, 0, promotedData[2]);

    let _finalData = await Promise.all(finalPosts.map(async (post: any) => { let userAPI = await axios.get(API + `/account/${post.author}`); return { ...post, user: userAPI.data.json } }));

    setCurrentState({feedPosts: _finalData, dataLoaded: true, loggedInUsername: username, currentAccount: userAPI.data, currentLoggedInStatus: true, feedType: 'private'});
  }

  const loadContent = async () => {
    // to add index later
    // let index = req.query.index | 0; 
    let index = 0;
    // let sData = req.cookies; 
    // let sUser = sData.breeze_username; 
    // let sKey = sData.token;
    let postsAPI = await axios.get(API + `/new/${index}`);
    // let nTags = await getTags(); 
    let promotedAPI = await axios.get(API + `/promoted`);
    let promotedData = [];
    let finalData = postsAPI.data;
    if (promotedAPI.data.length > 0) promotedData = promotedAPI.data.slice(0, 3).map((x: any) => ({ ...x, __promoted: true }));
    if (promotedData.length > 0) finalData.splice(1, 0, promotedData[0]);
    if (promotedData.length > 1) finalData.splice(5, 0, promotedData[1]);
    if (promotedData.length > 2) finalData.splice(10, 0, promotedData[2]);
    let _finalData = await Promise.all(finalData.map(async (post: any) => {
      const userAPI = await axios.get(API + `/account/${post.author}`);
      let ago = moment.utc(post.ts).fromNow();
      return { ...post, user: userAPI.data.json, ago: ago }
    }));
    // let nPosts=await axios.get(API+`/new/${index}`);
    // let iPosts=nPosts.data;
    // let sPosts = await Promise.all( iPosts.map(async (post: any) => { 
    //     let userAPI = await axios.get(API+`/account/${post.author}`); 
    //     let ago = moment.utc(post.ts).fromNow(); 
    //     return { ...post, user: userAPI.data.json, ago: ago } }) 
    // );
    setCurrentState({feedPosts: _finalData, dataLoaded: true, loggedInUsername: undefined, currentAccount: undefined, currentLoggedInStatus: false, feedType: 'public'});
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {

    setCurrentState({ feedPosts: [], dataLoaded: false});
  
    setTimeout(() => {
      event.detail.complete();
    }, 1800);
  }

  useEffect(() => {
    const checkLogin = async () => {
      const loginStatus = await checkLoginStatus();
      const username = await getUserName();

      const loadContentBasedOnLoginStatus = (username?: string) => {
        if (username) loadContentForLoggedInUser(username)
        if (!username) loadContent();
      }

      if (currentState.currentLoggedInStatus === loginStatus) {
        if(!currentState.dataLoaded) {
            loadContentBasedOnLoginStatus(username);
        } else if(currentState.dataLoaded) {
          if(loginStatus && currentState.feedType === 'public') {
            loadContentForLoggedInUser(username);
          } else if(!loginStatus && currentState.feedType === 'private') {
            loadContent();
          }
        }
      } else if (currentState.currentLoggedInStatus !== loginStatus) {
        loadContentBasedOnLoginStatus(username);
      }
    }
    checkLogin();
  })

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <IonRefresher pullFactor={2} pullMin={100} pullMax={200} slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Load new posts"
            refreshingSpinner="circles"
            refreshingText="Updating...">
          </IonRefresherContent>
        </IonRefresher>
        {currentState.dataLoaded ? (
          <IonRow>
            {currentState.dataLoaded && currentState.feedPosts.map((content: Content, index: number) => {
              return <IonCol key={('feed' + index)} size="12"><PostDetail username={currentState.loggedInUsername} content={content} /></IonCol>
            })}
          </IonRow>
        ) : (
          <IonLoading
            isOpen={!currentState.dataLoaded}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
