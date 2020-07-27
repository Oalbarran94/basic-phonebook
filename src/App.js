import React, { useState, useEffect, Fragment} from 'react';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import FormAdd from './components/FormAdd';
import DisplayContacts from './components/DisplayContacts';
import clienteAxios from './config/clienteAxios';;

function App() {

  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);
  const [globalContact, setGlobalContact] = useState({});

    useEffect(() => {
        const loadContacts = async () => {
            const response = await clienteAxios.get('/contacts');
            setContacts(response.data);
        }

        loadContacts();
    }, [reload]); 

  return (
    <Router>
      <Header />
      <Fragment>
        <br></br>
        <div className="container mt-10"> 

          <div className="row mt-10" >
            <div className="col-md-6">

              <DisplayContacts contacts={contacts} reload={reload} setReaload={setReload} setGlobalContact={setGlobalContact}/>

            </div>
            <div className="col-md-6">
              
            <FormAdd reload={reload} setReaload={setReload} globalContact={globalContact} setGlobalContact={setGlobalContact}/>

            </div>
          </div>
        </div>
      </Fragment>
    </Router>
    
  );
}

export default App;
