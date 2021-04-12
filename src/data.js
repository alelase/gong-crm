import Authenticator from './authenticator';

export default class Data {

    async getSecrets() {
        const myHeaders = new Headers();

        const myRequest = new Request('https://gongfetest.firebaseio.com/secrets.json', {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        });


        const response = await fetch(myRequest)
            .then(response => response.json())
            .then(data => {return data});

        console.log("Llego?", response);
        return response;
    }

    async getUsers() {
        const myHeaders = new Headers();

        const myRequest = new Request('https://gongfetest.firebaseio.com/users.json', {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        });


        const response = await fetch(myRequest)
            .then(response => response.json())
            .then(data => {return data});

        console.log("Llego users?", response);
        return response;
    }


    checkLoginData(secrets, user) {
        console.log("secrets", secrets);
        let mapSecret = new Map(Object.entries(secrets));
        console.log("mapSecret", mapSecret);
        console.log("user", user);


        const auth = new Authenticator();
        const secret = auth.encode(user.username, user.password);
        console.log("secret", secret);

        const userId = mapSecret.get(secret);
        console.log("userId", userId);
        return userId;
    }
}