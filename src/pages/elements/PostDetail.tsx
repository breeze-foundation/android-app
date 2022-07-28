import { IonCard, IonCardHeader, IonRow, IonCol, IonItem, IonAvatar, IonImg, IonLabel, IonCardTitle, IonCardContent, IonText, IonButton, IonIcon } from "@ionic/react";
import { heartOutline, walletOutline } from "ionicons/icons";
import moment from "moment";
import { PostDetailProp } from "../../model";

const PostDetail: React.FC<PostDetailProp> = (prop: PostDetailProp) => {
    const content = prop.content;

    return (
        <IonCard>
            <IonCardHeader>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonImg src="https://img.blurt.world/blurtimage/tekraze/2028f5f3f20e0f18ce4c7daf10cb154c4bd85094.png" />
                            </IonAvatar>
                            <IonLabel><b>@{content.author}</b> in <b>{content.json.category} <span>.</span> {moment.utc(content.ts).fromNow()} </b></IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow class='ion-padding'>
                    <IonCol size="12">
                        <IonCardTitle>{content.json.title}</IonCardTitle>
                    </IonCol>
                </IonRow>
            </IonCardHeader>
            <IonCardContent>
                <IonRow>
                    <IonCol>
                        <IonText>
                            <div dangerouslySetInnerHTML={{ __html: content.json.body! }} /></IonText>
                        {content.json && content.json.image && (
                            <IonImg src={content.json.image} />
                        )}</IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton><IonIcon icon={heartOutline} /> &nbsp;{content.likes}</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton>
                            <IonIcon icon={walletOutline} /> &nbsp;{content.dist ? (content.dist / 1000000) : 0} TMAC
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard>
    )
}

export default PostDetail