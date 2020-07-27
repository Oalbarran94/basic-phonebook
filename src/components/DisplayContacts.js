import React, {Fragment} from 'react';
import clienteAxios from '../config/clienteAxios';
import '../index.css';


const DisplayContacts = ({contacts, setReaload, reload, setGlobalContact, globalContact}) => {

    const deleteContact = async (id) => {
        try {
            await clienteAxios.delete(`/contacts/${id}`);
            setReaload(!reload);
        } catch (error) {
            console.log(error)
        }
    }

    const updateContact = async (contact) => {
        try {
            setGlobalContact(contact)
        } catch (error) {
            console.log(error)
        }
    }

    const updateFavorite = (contact) => {
        contact.favorite = !contact.favorite;
        
        try {
            clienteAxios.put(`/contacts/${contact.id}`, contact);
            setReaload(!reload);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <h3>Contact List</h3>

            {contacts.length === 0 ? 'There are no contacts yet.' : (
                <div className="row">
                    <div className="col-12">
                        {contacts.map((contact, i) => (
                            <div className="card mb-2" key={i}>
                                <div className="card-body">
                                    {!contact.favorite ? 
                                        (<p>Favorite contact: {contact.favorite} <i onClick={(e) => updateFavorite(contact)} className="fa fa-heart-o"></i></p> ) 
                                        : 
                                        (<p>Favorite contact: {contact.favorite} <i onClick={(e) => updateFavorite(contact)} className="fa fa-heart" style={{color: 'red'}}></i></p> )
                                    }
                                    <p>{contact.name}</p>
                                    <p>{contact.lastName}</p>
                                    <p>{contact.number}</p>
                                    
                                    <button type="button" onClick={(e) => {updateContact(contact)}} className="btn btn-primary mr-2">Update</button>
                                    <button type="button" onClick={(e) => {deleteContact(contact.id)}} className="btn btn-secondary">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </Fragment>
     );
}

export default DisplayContacts;