import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios';

const FormAdd = ({setReaload, reload, globalContact, setGlobalContact}) => {

    const [contact, setContact] = useState({
        name: '',
        lastName: '',
        number: '',
        relation: '',
        favorite: false
    })
    
    const [error, setError] = useState(false);

    useEffect(() => {
        if(Object.keys(globalContact).length !== 0){
            setContact({
                name: globalContact.name,
                lastName: globalContact.lastName,
                number: globalContact.number,
                relation: globalContact.relation,
                favorite: globalContact.favorite
            })
        }
        
    }, [globalContact])

    const {name = '', lastName, number, relation} = contact;

    const onChange = (e) => {
        setError(false);
        setContact({...contact, [e.target.name] : e.target.value})
    }

    const onSubmitContact = (e) => {
        e.preventDefault();

        if(name === '' || number === '' || relation === ''){
            setError(true);
            return;
        }

        if(Object.keys(globalContact).length !== 0){
            updateContact();
            setGlobalContact({})
        }else{
            addContact();
        }
        
        setContact({
            name: '',
            lastName: '',
            number: '',
            relation: ''
        });

        setGlobalContact({})
    }

    const addContact = async () => {
        try {
            await clienteAxios.post('/contacts', contact);
            setReaload(!reload);
        } catch (error) {
            console.log('Error inserting ', error);
            return;
        }
        
    }

    const updateContact = async () => {
        console.log()
        try {
            await clienteAxios.put(`/contacts/${globalContact.id}`, contact);
            setReaload(!reload);
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <Fragment>
            <h3>{globalContact.name !== undefined ? 'Update Contact' : 'Add a new contact'}</h3>

            <form onSubmit={onSubmitContact}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="name"
                        onChange={onChange}
                        value={name || ''}
                    />
                </div>

                <div className="form-group">
                    <label>Lastname</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="lastName"
                        onChange={onChange}
                        value={lastName}
                    />
                </div>

                <div className="form-group">
                    <label>Number</label>
                    <input 
                        type="number" 
                        className="form-control"
                        name="number"
                        onChange={onChange}
                        value={number} 
                    />
                </div>

                <div className="form-group">
                    <label>Relation</label>
                    <select 
                        className="form-control" 
                        name="relation" 
                        value={relation} 
                        onChange={onChange}
                    >
                        <option value="">-- Select --</option>
                        <option value="friend">Friend</option>
                        <option value="relative">Relative</option>
                    </select>
                </div>

                {
                    error ? (
                        <div className="alert alert-danger" role="alert">
                            Name, number and relation are mandatory
                        </div>
                    ) : null
                }

                <button type="submit" className="btn btn-primary">
                    {globalContact.name !== undefined ? 'Update' : 'Add'}
                </button>
          </form>
        </Fragment>
     );
}
 
export default FormAdd;