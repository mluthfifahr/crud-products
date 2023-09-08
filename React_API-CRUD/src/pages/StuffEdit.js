import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function StuffEdit() {

    let { id } = useParams()
    const navigate = useNavigate()
    const [stuff, setStuff] = useState({
        type: '',
        name: '',
        description: '',
        price: ''
    });

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/products/${id}`).then(res => {
            console.log(res)
            setStuff(res.data);
        });

    }, [id])

    const handleInput = (e) => {
        e.persist();
        let value = e.target.value;
        if(e.target.name==='price'){
            value = removeNoneNumeric(e.target.value)
        }
        setStuff({ ...stuff, [e.target.name]: value });
    }
    const saveStuff = (e) => {
        e.preventDefault();

        const data = {
            type: stuff.type,
            name: stuff.name,
            description: stuff.description,
            price: stuff.price,
        }
        console.log(data)

        axios.put(`http://127.0.0.1:8000/api/products/${id}`, data)
            .then(res => {
                alert(res.data.message);
                navigate('/stuff')
            });
    }

    const removeNoneNumeric = num => {
        return num.toString().replace(/[^0-9]/g, "");
    }


    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card bg-info">
                        <div className="card-header">
                            <h4>Edit Stuff
                                <Link to="/stuff" className="btn btn-light float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveStuff}>
                                <div className="mb-3">
                                    <label>Type</label>
                                    <input type="text" name="type" value={stuff.type} onChange={handleInput} className="form-control bg-dark border-0 text-info" placeholder="Enter Type"/>
                                </div>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" value={stuff.name} onChange={handleInput} className="form-control bg-dark border-0 text-info" placeholder="Enter Name"/>
                                </div>
                                <div className="mb-3">
                                    <label>Description</label>
                                    <input type="text" name="description" value={stuff.description} onChange={handleInput} className="form-control bg-dark border-0 text-info" placeholder="Enter a Descripton"/>
                                </div>
                                <div className="mb-3">
                                    <label>Price</label>
                                    <input type="text" name="price" value={stuff.price} onChange={handleInput} className="form-control bg-dark border-0 text-info" placeholder="Enter Price"/>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-dark text-info">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StuffEdit;