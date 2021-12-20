/*
Nick Moss
React/Node Challenge
12-20-2021

This project created with the create-react-app template utilizes a Node.js backend and
a React.js frontend. It calls the node server and retrieves a list of 7000 random users.
This project makes use of Infinite Scrolling so that not all the users are displayed at once
so that it can load fast. Once the last user of the page is displayed, the next page of users is
fetched and displayed below the existing users.

Each user in the list of users is clickable and when clicked will show additional info about that
user.
*/

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import User from './user'
import UserContainer from './userContainer'
import UserModal from './userModal'
import UserDetails from './userDetails'
import './App.css';

//Total pages needed to display 20 users per page for a total of 7000 users
const TOTAL_PAGES = parseInt(7000/20)

function App() {
  // State Hooks
  const [apiResponse, setApiResponse] = useState([]);
  const [modalClass, setModalClass] = useState("modalContainer");
  const [displayModal, setDisplayModal] = useState(false)
  const [userView, setUserView] = useState(null);
  const [pageNumber, setPageNumber] = useState(1)
  const [lastElement, setLastElement] = useState(null)

  // Intersection Observer used for Infinite Scrolling
  const observer = useRef(
    new IntersectionObserver(
        (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setPageNumber((no) => no + 1);
            }
        })
  );

  // API call which takes the page number as an argument
  const callRestApi = async (page) => {
    let endpoint = `http://localhost:3001/api/users?page=${page}`
    const response = await axios.get(endpoint);

    // Spread the data of the current user objects and existing user objects into one array
    let arrayOfUsers = new Set([...apiResponse, ...response.data])
    // Set the apiResponse to that array
    setApiResponse([...arrayOfUsers]);
  }

  // Fetches the API on page render and when pageNumber state changes
  useEffect(() => {
    if (pageNumber <= TOTAL_PAGES) {
      callRestApi(pageNumber)
    }
  }, [pageNumber])

  // Sets the Intersection Observer to watch the last element.
  // If the last Element changes this function will run
  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
        currentObserver.observe(currentElement);
    }

    return () => {
        if (currentElement) {
            currentObserver.unobserve(currentElement);
        }
    };
  }, [lastElement]);

  // Function to handle displaying the User Modal
  // for showing the User's details
  const handleDisplayUser = (user) => {
    // Receives a User Component as argument
    // Checks if the Modal is displayed
    if (!displayModal) {
      setDisplayModal(true);
      setModalClass('modalContainer active') // Show Modal
      setUserView(<UserDetails child={user}/>) // pass the User component as a child to the UserDetails component
    }
    else {
      setDisplayModal(false)
      setModalClass('modalContainer') // Hide Modal
    }
  }

  return (
    <div>
      {/* User Modal hidden by default */}
      <UserModal className={modalClass} onDisplayUser={()=>handleDisplayUser()} user={userView}/>
      <div>
        <h1>List of Users</h1>
        <p>Click on a user to view additional info about them!</p> 
        <ul>
          {
            //Checks if the apiResponse contains user objects then maps each user object
            apiResponse.length > 0 && apiResponse.map((user, i) => {
              // If the current user object is the last object in the apiResponses array
              // and the pageNumber is less than TOTAL_PAGES, then the last user object
              // is wrapped in a div and set as the last element to be observed so Infinite
              // Scrolling can happen else a regular UserContainer object is returned
              if (i === apiResponse.length - 1 && pageNumber <= TOTAL_PAGES) {
                return(
                <div ref={setLastElement} key={i}>
                  <UserContainer 
                  onDisplayUser={(myuser)=>handleDisplayUser(myuser)} // Function to display additional info for a user
                  key={i} // UserContainer key
                  user={<User // User component passed as a prop to the UserContainer
                          id={i} 
                          name={user.name.first + ' ' + user.name.last} 
                          email={user.email} 
                          profilePic={user.picture}
                          address={user.location}
                          dob={new Date(user.dob.date).toLocaleDateString('en-us')}
                          phone={user.phone}

                        />}
                  />
                </div>)
              } else {
                return(
                  <UserContainer 
                    onDisplayUser={(myuser)=>handleDisplayUser(myuser)} // Function to display additional info for a user
                    key={i} // UserContainer key
                    user={<User // User component
                            id={i} 
                            name={user.name.first + ' ' + user.name.last} 
                            email={user.email} 
                            profilePic={user.picture}
                            address={user.location}
                            dob={new Date(user.dob.date).toLocaleDateString('en-us')}
                            phone={user.phone}

                          />}
                  />)}
              }
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
