import React, { useEffect, useState } from "react"
import { IonContent, IonItem, IonRow, IonGrid, IonCol, IonAlert, IonInput, IonPage, IonIcon, IonLabel, IonButton } from '@ionic/react';
import AppHeader from '../components/AppHeader';
import { personCircle } from 'ionicons/icons';
import { useHistory } from "react-router";
import { Account } from "../model/Account";
import { checkLoginStatus, set } from '../data/IonicStorage';

var CryptoJS = require("crypto-js");

declare const window: any;
const breej: any = window.breej!;
breej.init({api: process.env.API_URL})

interface LoginPageProps {
    setLoginStatusGlobal?: any
}

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {

    const [loggedInStatus, setLoginStatus] = useState(false);

    const history = useHistory();

    const [username, setUsername] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [token, setToken] = useState<string>('');
    
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { setLoginStatusGlobal } = props;

    useEffect(() => {

        const checkLogin = async () => {
            const status = await checkLoginStatus()
            if(status) {
                setLoginStatus(true);
                setLoginStatusGlobal(true);
                history.push('/feed')
            }
          }
      
          if (!loggedInStatus) checkLogin()

	}, [loggedInStatus, history, setLoginStatusGlobal]);

    const onChangeUsername = (username: string) => {
        if (username && username.length > 0) {
            setUsername(username);
        }
    }

    const onChangePrivateKey = (privateKey: string) => {
        if (privateKey && privateKey.length > 0) {
            setPrivateKey(privateKey);
        }
    }

    const handleLogin = () => {
        if (!username) {
            setMessage("Please enter a valid username");
            setIserror(true);
            return;
        }
    
        if (!privateKey || privateKey.length < 6) {
            setMessage("Please enter your Private Key");
            setIserror(true);
            return;
        }
        breej.getAccount(username, function (error: any, account: Account) {
            let pubkey = "";
            // console.log('error', error);
            // console.log('account', account);
            if(account.error) {
                setMessage('Not a Valid User')
                setIserror(true)
                return
            }
            try{
                pubkey = breej.privToPub(privateKey)
            } catch(e: any) {
                setMessage('Private Key is incorrect')
                setIserror(true)
                return
            }
            if(account.pub !== pubkey) {
                setMessage('Password validation failed')
                setIserror(true)
                return
            } else {
                // Sucess Login here
                const encrypted = CryptoJS.AES.encrypt(pubkey, 'tekraze', {iv: '1'});
                const token = encrypted.toString();
                // console.log('token')

                setToken(token);
                setLoginStatus(true);

                // store user creds to local storage
                set('login_status', true);
                set('username', username);
                set('token', token);
                // to access for non latest changes
                set('account', account)

                props.setLoginStatusGlobal(true);
                history.push("/profile");
            }
        })
    }

    return (
        <IonPage>
            <AppHeader />
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonAlert
                                isOpen={iserror}
                                onDidDismiss={() => setIserror(false)}
                                cssClass="my-custom-class"
                                header={"Error!"}
                                message={message}
                                buttons={["Dismiss"]}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                style={{ fontSize: "70px", color: "#0040ff" }}
                                icon={personCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Username</IonLabel>
                                <IonInput
                                    type="text"
                                    value={username}
                                    onIonChange={(e) => onChangeUsername(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Private Key</IonLabel>
                                <IonInput
                                    type="password"
                                    value={privateKey}
                                    onIonChange={(e) => onChangePrivateKey(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <p style={{ fontSize: "small" }}>
                                By clicking LOGIN you agree to our Policy
                            </p>
                            <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
                            <p style={{ fontSize: "medium" }}>
                                Don't have an account? <a href="/signup">Sign up!</a>
                            </p>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage