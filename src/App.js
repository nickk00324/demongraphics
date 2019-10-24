import React, { Fragment, useState } from 'react';
import Particles from 'react-particles-js';
import particleParams from './particlesjs-config.json';
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import ImageInputForm from "./components/ImageInputForm/ImageInputForm";
import SignIn from "./components/SignIn/Signin";
import Register from "./components/Register/Register";
import Rank from './components/Rank/Rank';
import './App.css';
import PersonRecognition from './components/PersonRecognition/PersonRecognition.js';

//localhost for testing, server url for production
const host = 'https://lit-savannah-11730.herokuapp.com';
//const serverURL = 'https://lit-savannah-11730.herokuapp.com/'

const App = () => {
  const [route, setRoute] = useState("signIn")
  const [input, setInput] = useState("");
  const [url, setURL] = useState("");
  const [isSignedIn, setSignIn] = useState(false);
  const [person, setPerson] = useState({
    age: "-1",
    ethnicity: "",
    gender: ""
  });
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  });

  const logOut = () => {
    setUser({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: ""
    });
    setURL("");
    setPerson({
      age: "-1",
      ehtnicity: "",
      gender: ""
    });
    onRouteChange('signIn');
  }

  const onInputChange = event => {
    setInput(event.target.value);
  }

  const loadUser = user => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    });
  }

  const formatPerson = personData => {
    const ageData = filterHighestProbability(personData.age_appearance.concepts);
    const ethnicityData = filterHighestProbability(personData.multicultural_appearance.concepts);
    const genderData = filterHighestProbability(personData.gender_appearance.concepts);
    genderData.name = genderData.name === "masculine" ? "man" : "woman";
    return { age: ageData.name, ethnicity: ethnicityData.name, gender: genderData.name};
  }

  const filterHighestProbability = probArray => {
    let highest = { value: 0};
    probArray.forEach( prob => {
      highest = prob.value > highest.value ? prob : highest;
    });
    return highest;
  }

  const onSubmit = () => {
    setURL(input);
    fetch(`${host}/imageURL`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: input
      })
    })
    .then(response => response.json())
    .then(data => {
      const newPerson = formatPerson(data);
      setPerson(newPerson);
    }) 
    .then(
      function (response) {
        if(response) {
          fetch(`${host}/image`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: user.id
            })
          })
          .then( response => response.json())
          .then(data => {
            console.log(data);
          })
          .then ( userEntries => Object.assign(user, {entries: userEntries}))
        }
          // const newPerson = formatPerson(response);
          // setPerson(newPerson);
      },
      function (err) {
        console.log(err);
      }
    );
  }

  const onRouteChange = route => {
    if(route === "home"){
      setSignIn(true);
    } else{
      setSignIn(false);
    }
    setRoute(route);
  }


  return(
    <Fragment>
      <Particles className="particles" params={particleParams}/>
      <Navigation logOut={logOut} isSignedIn={isSignedIn} onRouteChange={onRouteChange} route={route}/>
      { route === 'home' ? 
        <Fragment>
          <Logo />
          <Rank person={person} />
          <ImageInputForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <PersonRecognition url={url} />
        </Fragment>
        : (
          route === 'signIn' ? 
            <Fragment>
              <SignIn host={host} onRouteChange={onRouteChange} />
            </Fragment>
            :
            <Fragment>
              <Register host={host} loadUser={loadUser} onRouteChange={onRouteChange} />
            </Fragment>
          )   
      }
    </Fragment>
  );
}

export default App;

