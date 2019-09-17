import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBLbd8pBeAv974Z3-ghISIZeSUNRDotz9o',
	authDomain: 'catchoftheday-reactdemo.firebaseapp.com',
	databaseURL: 'https://catchoftheday-reactdemo.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
