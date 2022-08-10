import { IonCard,IonCardHeader, IonRow, IonCol, IonItem, IonAvatar, IonImg, IonCardTitle, IonCardContent, IonText, IonButton, IonIcon, } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import like from '../../images/icons/like.svg'
import liked from '../../images/icons/liked.svg'
import moment from "moment";
import { useHistory } from "react-router-dom";
import { PostDetailProp } from "../../model";
import './PostDetail.css';

const PostDetail: React.FC<PostDetailProp> = (prop: PostDetailProp) => {

    const { author, account, content, singlePost, username, ownContent, likedContent } = prop;

    const history = useHistory();

    const goToPostDetailPage = (singleContent: any) => {
        // To disable navigation in case single post
        if (!singlePost) {
            history.push('/singlepost', singleContent);
        } else {
            // to do code for navigation to original source in case it is a third party link
        }
    }

    const promotedIcon = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 30 30'><title>Promoted</title><path d='M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 13 10 L 13 12 L 18.5625 12 L 9.28125 21.28125 L 10.71875 22.71875 L 20 13.4375 L 20 19 L 22 19 L 22 10 Z' /></svg>"

    let profileImageSrc = '';
    if (content.user && content.user.profile) {
        const profile = content.user.profile;
        if (profile.avatar) {
            profileImageSrc = profile.avatar;
        }
    } else if (author) {
        if (author.json && author.json.profile && author.json.profile.avatar) {
            profileImageSrc = author.json.profile.avatar;
        }
    } else if (account) {
        if (account.json && account.json.profile && account.json.profile.avatar) {
            profileImageSrc = account.json.profile.avatar;
        }
    }

    const myVote = username && content.votes ? (content.votes.indexOf((vote: any) => vote.u === username) === -1 ? false : true) : false;

    return (
        <IonCard>
            <IonCardHeader>
                {content.__promoted && (
                    <IonRow className="ion-justify-content-start ion-align-items-baseline">
                        <IonCol>
                            <IonText color="primary">
                                <IonIcon  size="small" icon={promotedIcon} />Promoted
                            </IonText>
                        </IonCol>
                    </IonRow>
                )}
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonAvatar >
                                {profileImageSrc.length > 0 ? (
                                    <IonImg className="ion-icon" src={profileImageSrc} />
                                ) : (
                                    <IonIcon className="ion-icon" icon={personCircleOutline} />
                                )}
                            </IonAvatar>
                            <IonText className="smallText">
                                    <b>@{content.author} </b>
                                    in &nbsp;
                                    <b className="category-color ion-text-primary ion-text-capitalize">{content.json.category}</b> 
                                    <b className="greyColor">&nbsp;•&nbsp;</b>
                                    {moment.utc(content.ts).fromNow()}  
                            </IonText>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="12">
                        <IonCardTitle onClick={() => goToPostDetailPage(content)}>{content.json.title}</IonCardTitle>
                    </IonCol>
                </IonRow>
            </IonCardHeader>
            <IonCardContent>
                <IonRow>
                    <IonCol onClick={() => goToPostDetailPage(content)}>
                        <IonText color="dark">
                            <div dangerouslySetInnerHTML={{ __html: content.json.body! }} />
                        </IonText>
                        <br/>
                        {content.json.tags ? (
                            <IonText color="primary">
                                {content.json.tags.map((tag: string, index: number) => {
                                    return (<span key={index}>#{tag}&nbsp;</span>)
                                })}
                            </IonText>
                           
                        ) : (<></>)}
                        {content.json && content.json.image && (
                            <IonImg className="img-radius" src={content.json.image} />
                        )}</IonCol>
                </IonRow>
                <IonRow>
                    <IonCol >
                        <IonButton fill="clear" color="#fff">
                                 {ownContent && (
                                <><IonIcon slot="icon-only"  icon={like}/>&nbsp;<IonText color="dark">{content.likes}</IonText> </>
                                )}
                                {likedContent && (
                                    <><IonIcon slot="icon-only"  icon={liked} />&nbsp; <IonText color="dark">{content.likes}</IonText></>
                                )}
                                {!ownContent && !likedContent && (
                                    <><IonIcon slot="icon-only" icon={myVote ? liked : like}
                                    color="dark" /> &nbsp;<IonText color="dark">{content.likes}</IonText></>
                                )}
                        </IonButton>
                    </IonCol>
                    <IonCol >
                        <IonButton fill="clear" color="#fff">
                           <IonText color="dark">{content.dist ? (content.dist / 1000000) : 0} TMAC</IonText> 
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard>
    )
}

export default PostDetail