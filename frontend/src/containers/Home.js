import React from 'react'
import Layout from '../components/Layout';
import Game from '../assets/images/91vyVfjkQzS._SY550_.jpg'
import { Link } from 'react-router-dom';

 const Home = () => {
    return (
        <Layout title="Home" content=''>
            <h1 className="display-4 mt-5">Mini Shop</h1>
            <h2 className="fs-4 fw-light fst-italic mt-3">Where you can buy mario video games</h2>
            <div className="mt-5 bg-light p-5 rounded shadow">
                <h3 className="display-6">Check Out our Mario Game Set</h3>
                <p className="lead mt-3 mb-4">More fun games for the whole family</p>
                <Link className="btn btn-info shadow-sm" to="/checkout">I WANT THIS GAME!</Link>
            </div>
            <div className="col mt-5 mb-5">
                <div className="col-3">
                    <img 
                    className="img-fluid"
                    src={Game}
                    alt="Mario 3d World" />
                    </div>

                    <div className="offset-2 col-7">
                        <ul className="list-group list-group-flush mt-5">
                            <li className="list-group-item fs-4 lead">
                                Insane Gameplay
                            </li>
                            <li className="list-group-item fs-4 lead">
                                Greatest controls
                            </li>
                            <li className="list-group-item fs-4 lead">
                                Switch Friendly
                            </li>
                            <li className="list-group-item fs-4 lead">
                                Multiplayer
                            </li>
                            <li className="list-group-item fs-4 lead">
                                2 in One
                            </li>
                            <li className="list-group-item fs-4 lead">
                                Great for a gift
                            </li>
                        </ul>
                    </div>
            </div>
        </Layout>
    )
}

export default Home;
