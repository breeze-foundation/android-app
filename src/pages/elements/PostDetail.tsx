import { IonCard, IonCardHeader, IonRow, IonCol, IonItem, IonAvatar, IonImg, IonLabel, IonCardTitle, IonCardContent, IonText, IonButton, IonIcon, IonChip } from "@ionic/react";
import { heart, heartOutline, person, time, walletOutline } from "ionicons/icons";
import moment from "moment";
import { PostDetailProp } from "../../model";
import './PostDetail.css';

const PostDetail: React.FC<PostDetailProp> = (prop: PostDetailProp) => {

    const { content, author, account } = prop;

    let profileImageSrc = '';
    if(author) {
        if(author.json && author.json.profile && author.json.profile.avatar) {
            profileImageSrc = author.json.profile.avatar;
        }
    } else if(account) {
        if(account.json && account.json.profile && account.json.profile.avatar) {
            profileImageSrc = account.json.profile.avatar;
        }
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonAvatar slot="start">
                                {profileImageSrc.length > 0 ? (
                                    <IonImg src={profileImageSrc} />
                                ): (
                                    <IonIcon icon={person} />
                                )}
                            </IonAvatar>
                            <IonText><b>@{content.author}</b> in <b className="category-color ion-text-primary ion-text-uppercase">{content.json.category}</b> <br/> 
                                <IonChip outline color="primary">
                                    <IonIcon icon={time}></IonIcon>
                                    <IonLabel>{moment.utc(content.ts).fromNow()}</IonLabel>
                                </IonChip>
                            </IonText>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="12">
                        <IonCardTitle>{content.json.title}</IonCardTitle>
                    </IonCol>
                </IonRow>
            </IonCardHeader>
            <IonCardContent>
                <IonRow>
                    <IonCol>
                        <IonLabel>
                            <div dangerouslySetInnerHTML={{ __html: content.json.body! }} /></IonLabel>
                        {content.json && content.json.image && (
                            <IonImg src={content.json.image} />
                        )}</IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton>
                            <IonIcon slot="icon-only" icon={content.likes! > 0 ? heart : heartOutline} 
                            color={content.likes! > 0 ? 'danger' : 'medium'} /> &nbsp;{content.likes}
                        </IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton>
                            <IonIcon slot="icon-only" icon={walletOutline} /> &nbsp;{content.dist ? (content.dist / 1000000) : 0} TMAC
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard>
    )
}

export default PostDetail