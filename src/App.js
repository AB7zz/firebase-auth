import React, {Component} from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
firebase.initializeApp({
  apiKey: "AIzaSyBwT0QYVGAg7Z4cwl0YCLld7jpBK-Lb8r8",
  authDomain: "mern-stack-signup-form.firebaseapp.com"
})
class App extends Component {
  state = {isFirebaseSignedIn: false}
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isFirebaseSignedIn: !!user })
      // console.log(isFirebaseSignedIn)
      console.log("user", user)
    })
  }

  render() {
    return (
      <div>
        {this.state.isFirebaseSignedIn ? (
          <>
            <p>{firebase.auth().currentUser.displayName} has signed in!</p>
            <button onClick={()=>firebase.auth().signOut()}>Sign Out</button>
            <br></br>
            <br></br>
            <img alt="displayPic" src={firebase.auth().currentUser.photoURL} />
          </>
          ) : 
          <StyledFirebaseAuth 
            uiConfig = {this.uiConfig}
            firebaseAuth = {firebase.auth()}
          />
        }
      </div>
    )
  }
}


export default App