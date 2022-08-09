import { IonButton, IonCol, IonContent, IonIcon, IonLoading, IonPage, IonRow } from "@ionic/react"
import { arrowBack } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"
import AppHeader from "../components/AppHeader"
import { getUserName } from "../data/IonicStorage"
import PostDetail from "./elements/PostDetail"

const SinglePostPage: React.FC = (props) => {

    const location = useLocation();
    const history = useHistory();
    const [currentState, setCurrentState] = useState<any>({ loggedInUsername: undefined, contentLoaded: false, content: undefined });

    useEffect(() => {

        const loadContent = async () => {
            if (location.state) {
                const contentFromPage: any = location.state;
                if (contentFromPage.ts || contentFromPage.author || contentFromPage.link || contentFromPage.contentTs) {
                    const userName = await getUserName();
                    if (!currentState.contentLoaded) {
                        setCurrentState({ loggedInUsername: userName, contentLoaded: true, content: contentFromPage });
                    } else if (currentState.contentLoaded && currentState.content !== contentFromPage) {
                        setCurrentState({ loggedInUsername: userName, contentLoaded: true, content: contentFromPage });
                    }
                }
            }
        }

        loadContent();

    }, [location.state, currentState, history])

    return (
        <IonPage>
            <AppHeader />
            <IonContent fullscreen>
                {currentState.contentLoaded ? (
                    <>
                        <IonRow>
                            <IonCol size="12">
                                <PostDetail username={currentState.loggedInUsername} singlePost={true} content={currentState.content} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonButton fill="outline" onClick={() => history.goBack()} color="primary">
                                    <IonIcon color="tertiary" slot="icon-only" icon={arrowBack} />Back</IonButton>
                            </IonCol>
                        </IonRow>
                    </>
                ) : (
                    <IonLoading
                        isOpen={!currentState.contentLoaded}
                    />
                )}
            </IonContent>
        </IonPage>
    )
}

export default SinglePostPage;