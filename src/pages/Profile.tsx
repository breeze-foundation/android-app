import { IonAvatar, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonLoading, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, useIonLoading } from '@ionic/react';
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

const Profile: React.FC = () => {

  const [currentAccount, setCurrentAccount] = useState<Account>({});
  const [selectedSegment, setSelectedSegment] = useState('posts');

  const [likedContent, setLikedContent] = useState<any>([]);
  const [blogContent, setBlogContent] = useState<any>([]);
  const [likedContentLoaded, setLikedContentLoaded] = useState(false);
  const [blogContentLoaded, setBlogContentLoaded] = useState(false);

  const [segmentLoaderPresent] = useIonLoading();

  useEffect(() => {
    const loadAccount = async () => {
      const username = await getUserName();
      if (username) {
        breej.getAccount(username, function (error: any, account: Account) {
          console.log('get account', account);
          if (account) {
            if(!likedContent || (likedContent && likedContent.length === 0)) {
              loadLikedContent(account.name!);
            }
            if(!blogContent || (blogContent && blogContent.length === 0)) {
              loadBlogContent(account.name!);
            }
            setCurrentAccount(account);
          }
        });
      }
    }

    const loadLikedContent = async (username: string) => {
      let likesAPI = await axios.get(`${API}/votes/${username}`);
      if (likesAPI.status === 200) {
        setLikedContent(likesAPI.data);
        setLikedContentLoaded(true);
      }
    }

    const loadBlogContent = async (username: string) => {
      let blogAPI = await axios.get(`${API}/blog/${username}`);
      if (blogAPI.status === 200) {
        setBlogContent(blogAPI.data);
        setBlogContentLoaded(true);
      }
    }

    if (!currentAccount.name) loadAccount();

  }, [currentAccount, selectedSegment, likedContent, blogContent, blogContentLoaded, likedContentLoaded])

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
    if(segment === 'posts') {
      message = 'Loading posts...';
    } else if(segment === 'likes') {
      message = 'Loading likes...'
    }
    segmentLoaderPresent({message, duration:500, spinner:'circles'});
    setSelectedSegment(segment)
  }

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        {currentAccount.name ? (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonAvatar className='ion-content-padding'>
                  <img alt="author pic" src={currentAccount.json.profile.avatar} />
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
                  <IonIcon icon={walletOutline} /> {currentAccount.balance! / 1000000}TMAC &nbsp;
                  <IonIcon icon={flashOutline} /> {currentAccount.bw.v / 4}VP &nbsp;
                  <IonIcon icon={flashOutline} /> {currentAccount.bw.v}BW
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem lines="none">
                  <IonLabel>{currentAccount.json.profile.about}</IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText className="ion-padding">
                  <IonIcon icon={locationOutline} />{currentAccount.json.profile.location} &nbsp;
                  <IonIcon icon={calendarOutline} /> {formattedCreatedDate(currentAccount.created.ts)} &nbsp;
                  <IonIcon icon={globeOutline} /> {currentAccount.json.profile.website}</IonText>
              </IonCol>
            </IonRow>
            <IonItemDivider></IonItemDivider>
            {likedContentLoaded && blogContentLoaded ? (
              <IonSegment onIonChange={(e) => handleSegmentChange(e.detail.value!)} value={selectedSegment}>
                <IonSegmentButton value="posts">Posts</IonSegmentButton>
                <IonSegmentButton value="likes">Likes</IonSegmentButton>
              </IonSegment>
            ) : (
              <IonLoading
                isOpen={!likedContentLoaded || !blogContentLoaded}
              />
            )}
            {selectedSegment === 'posts' && (
              <IonRow>
                {blogContentLoaded && blogContent.map((content: Content, index: number) => {
                  return <IonCol key={content._id || ('bc' + index)} size="12"><PostDetail content={content} /></IonCol>
                })}
              </IonRow>
            )}

            {selectedSegment === 'likes' && (
              <IonRow>
                {likedContentLoaded && likedContent.map((content: Content, index: number) => {
                  return <IonCol key={content._id || ('lc' + index)} size="12"><PostDetail content={content} /></IonCol>
                })}
              </IonRow>
            )}
          </IonGrid>
        ) : (
          <IonLoading
            // cssClass='my-custom-class'
            isOpen={!currentAccount}
            // onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}
            duration={5000}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;