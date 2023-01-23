import React, { useState } from 'react';
import { useEffect } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');

    const [user, setUser] = useState([])

    useEffect(() => {
        fetch(`https://react-task-server-nine.vercel.app/${show}`)
            .then(res => res.json())
            .then(data => {

                setUser(data)

            })
    }, [show])


    useEffect(() => {
        fetch('https://react-task-server-nine.vercel.app/info')
            .then(res => res.json())
            .then(data => {

                setUser(data)

            })
    }, [])

    console.log(user)

    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const status = form.status.value;

        const info = {
            name,
            status
        }
        form.reset();

        fetch('http://localhost:5000/addInfo', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json)
            .then(data => console.log(data))

    }

    const handleClick = (val) => {
        setShow(val);

        console.log(val);

    }



    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input name='name' type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input name='status' type="text" className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>


                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>


                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {


                                user.map(ar =>
                                    <tr key={ar.name}
                                    >
                                        <td>
                                            {
                                                ar.name
                                            }
                                        </td>
                                        <td>
                                            {
                                                ar.status
                                            }
                                        </td>

                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;