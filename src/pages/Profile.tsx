import { IonAvatar, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItemDivider, IonLoading, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, useIonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';

import { getUserName } from '../data/IonicStorage';
import { Account } from '../model/Account';

import { globeOutline, calendarOutline, locationOutline, flashOutline, walletOutline } from 'ionicons/icons';

import axios from 'axios';
import { Content } from '../model';
import PostDetail from './elements/PostDetail';

declare const window: any;
const breej: any = window.breej!;
const API = process.env.API_URL || 'https://api.breezechain.org';
breej.init({ api: API })

interface profileProps {
  // setLoginStatusGlobal?: any
  globalLoginStatus?: boolean
}

const Profile: React.FC<profileProps> = (props: profileProps) => {

  const [segmentLoaderPresent] = useIonLoading();

  const blogContentStateObject: any = {
    content: undefined,
    contentLoaded: false
  }

  const likedContentStateObject: any = {
    content: undefined,
    contentLoaded: false,
    contentUsers: undefined
  }

  const [currentState, setCurrentState] = useState<any>({
    currentAccount: undefined,
    selectedSegment: 'posts',
    blogContentState: blogContentStateObject,
    likedContentState: likedContentStateObject
  });

  useEffect(() => {

    // need to add account refresh/update hook

    const loadAccount = async () => {
      const username = await getUserName();

      // Update only if we dont have account or account is changed
      if ((!currentState.currentAccount && username) || (currentState.currentAccount && currentState.currentAccount.name !== username)) {
        breej.getAccount(username, async function (error: any, account: Account) {
          if (account) {
            let blogContentStateData = {};
            let likedContentStateData = {};
            likedContentStateData = await loadLikedContent(account.name!);
            blogContentStateData = await loadBlogContent(account.name!);
            setCurrentState({ ...currentState, currentAccount: account, blogContentState: blogContentStateData, likedContentState: likedContentStateData });
          }
        });
      }
    }

    const loadLikedContent = async (username: string) => {
      const likesAPI = await axios.get(`${API}/votes/${username}`);
      if (likesAPI.status === 200) {
        const userApiPromises: any[] = [];
        for (let likedData of likesAPI.data) {
          const userLAPI = axios.get(API + `/account/${likedData.author}`);
          userApiPromises.push(userLAPI);
        }
        return await loadLikedContentUsers(likesAPI.data, userApiPromises);
      } else {
        return { content: [], contentUsers: [], contentLoaded: true };
      }
    }

    const loadBlogContent = async (username: string) => {
      let blogAPI = await axios.get(`${API}/blog/${username}`);
      if (blogAPI.status === 200) {
        return { content: blogAPI.data, contentLoaded: true }
      } else {
        return { content: [], contentLoaded: true }
      }
    }

    const loadLikedContentUsers = async (content: any, userApiPromises: any[]) => {
      try {
        const users = await Promise.all(userApiPromises);
        const usersData: any[] = [];
        for (let user of users) {
          if (user.data) usersData.push(user.data);
        }
        return { content, contentUsers: usersData, contentLoaded: true };
      } catch (err) {
        console.log('error while loading users');
        return { content, contentUsers: [], contentLoaded: true };
      }
    }

    if(props.globalLoginStatus) loadAccount();
  }, [currentState, props.globalLoginStatus]);

  const formattedCreatedDate = (dateTimeStamp: any) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const createdDate = new Date(dateTimeStamp);
    const monthName = monthNames.at(createdDate.getMonth());
    const year = createdDate.getFullYear();
    return <span>{monthName} {year}</span>
  }

  const handleSegmentChange = (segment: string) => {
    let message = '';
    if (segment === 'posts') {
      message = 'Loading posts...';
    } else if (segment === 'likes') {
      message = 'Loading likes...'
    }
    segmentLoaderPresent({ message, duration: 500, spinner: 'circles' });
    setCurrentState({ ...currentState, selectedSegment: segment });
  }

  const { currentAccount, selectedSegment, blogContentState, likedContentState } = currentState;

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        {currentAccount && currentAccount.name ? (
          <IonGrid style={{ paddingTop: '0', marginTop: '-1.2rem' }}>
            <IonRow style={{ margin: '1rem -1rem -2rem' }}>
              <IonCol>
                <IonImg src={currentAccount.json.profile.cover_image ? currentAccount.json.profile.cover_image :
                  'https://i.imgur.com/CAFy1oY.jpg'} />
                <IonAvatar class='ion-no-padding'>
                  <img style={{ margin: '-2rem 2rem 1rem' }} alt="author pic" src={currentAccount.json.profile.avatar} />
                </IonAvatar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonTitle>@{currentAccount.name}</IonTitle>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText className="ion-padding">
                  <IonIcon color="primary" icon={walletOutline} /> {currentAccount.balance! / 1000000}TMAC &nbsp;
                  <IonIcon color="primary" icon={flashOutline} /> {currentAccount.bw.v / 4}VP &nbsp;
                  <IonIcon color="primary" icon={flashOutline} /> {currentAccount.bw.v}BW
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText className="ion-padding">{currentAccount.json.profile.about}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText className="ion-padding">
                  <IonIcon color="medium" icon={locationOutline} />{currentAccount.json.profile.location} &nbsp;
                  <IonIcon color="medium" icon={calendarOutline} /> {formattedCreatedDate(currentAccount.created.ts)} &nbsp;
                  <IonIcon color="medium" icon={globeOutline} /> {currentAccount.json.profile.website}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText className="ion-padding">
                  <b>{currentAccount.follows!.length || 0}</b> &nbsp;Following &nbsp;
                  <b>{currentAccount.followers!.length || 0}</b> &nbsp;Followers
                </IonText>
              </IonCol>
            </IonRow>
            <IonItemDivider></IonItemDivider>
            {likedContentState.contentLoaded && blogContentState.contentLoaded ? (
              <IonSegment onIonChange={(e) => handleSegmentChange(e.detail.value!)} value={selectedSegment}>
                <IonSegmentButton value="posts">Posts</IonSegmentButton>
                <IonSegmentButton value="likes">Likes</IonSegmentButton>
              </IonSegment>
            ) : (
              <IonLoading
                isOpen={!likedContentState.contentLoaded || !blogContentState.contentLoaded}
              />
            )}
            {selectedSegment === 'posts' && (
              <IonRow>
                {blogContentState.contentLoaded && blogContentState.content.map((content: Content, index: number) => {
                  return <IonCol key={('bc' + index)} size="12"><PostDetail ownContent username={currentAccount.name} account={currentAccount} content={content} /></IonCol>
                })}
              </IonRow>
            )}

            {selectedSegment === 'likes' && (
              <IonRow>
                {likedContentState.contentLoaded && likedContentState.content.map((content: Content, index: number) => {
                  return <IonCol key={('lc' + index)} size="12"><PostDetail likedContent account={currentAccount} username={currentAccount.name}
                    author={likedContentState.contentUsers.find((author: any) => author.name === content.author)} content={content} /></IonCol>
                })}
              </IonRow>
            )}
          </IonGrid>
        ) : (
          <IonLoading
            isOpen={!currentAccount}
            message={'Please wait...'}
            duration={5000}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;