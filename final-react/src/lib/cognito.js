import {CognitoUserPool} from 'amazon-cognito-identity-js'

let poolData = {
    UserPoolId: 'us-east-2_714PO4Pwl',
    ClientId: '2jhfmbrqlqo19dj3p8bp2mmqaa'
}

export default new CognitoUserPool(poolData)