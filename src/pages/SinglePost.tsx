import { IonCol, IonContent, IonLoading, IonPage, IonRow } from "@ionic/react"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"
import AppHeader from "../components/AppHeader"
import { getUserName } from "../data/IonicStorage"
import { Content } from "../model"
import PostDetail from "./elements/PostDetail"

const SinglePostPage: React.FC = (props) => {

    const location = useLocation();
    const history = useHistory();
    const [currentState, setCurrentState] = useState<any>({loggedInUsername: undefined, contentLoaded: false, content: undefined});

    useEffect(() => {

        const loadContent = async () => {
            if (location.state) {
                const contentFromPage: Content = location.state as Content;
                if(contentFromPage._id) {
                    const userName = await getUserName();
                    // to clear last displayed post from state
                    if(currentState.contentLoaded && currentState.content._id && (currentState.content._id !== contentFromPage._id)) {
                        setCurrentState({loggedInUsername: undefined, contentLoaded: false, content: undefined});
                    }

                    // to fetch and set fresh data
                    if(!currentState.contentLoaded) {
                        if(userName && contentFromPage._id) {
                            setCurrentState({loggedInUsername: userName, contentLoaded: true, content: contentFromPage});
                        } else if(!userName && contentFromPage._id) {
                            setCurrentState({loggedInUsername: undefined, contentLoaded: true, content: contentFromPage})
                        }
                    }
                }
            } else {
                // in case we do not have post content, redirect back to home page
                // only for browser
                history.push('/');
            }
        }

        loadContent();

    }, [currentState, location, history])

    return (
        <IonPage>
            <AppHeader />
            <IonContent fullscreen>
                {currentState.contentLoaded && currentState.content._id ? (
                    <IonRow>
                        <IonCol size="12">
                            <PostDetail username={currentState.loggedInUsername} singlePost={true} content={currentState.content} />
                        </IonCol>
                    </IonRow>
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