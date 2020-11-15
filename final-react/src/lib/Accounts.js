import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "./cognito";

const AccountContext = createContext();

const Account = (props) => {

    const setSession = async () => {
        await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.signOut()
            }
        })
    }

    const getSession = async () => {
        await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession((err, session)=>{
                    if ( err ){
                        reject(err)
                    } else {
                        resolve(session)
                    }
                })
            }
        })
    }

  const authenticate = async (email, pass) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: email, Pool });
      const autDetails = new AuthenticationDetails({
        Username: email,
        Password: pass,
      });

      user.authenticateUser(autDetails, {
        onSuccess: (data) => {
          console.log("onSuccess", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.log("onFailure:", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
          resolve(data);
        },
      });
    });

  return (
    <AccountContext.Provider value={{ authenticate, getSession , setSession}}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
