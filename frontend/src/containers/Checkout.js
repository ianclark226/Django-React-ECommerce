import React, { useState, useEffect, Fragment } from "react";
import Layout from "../components/Layout";
import DropIn from 'braintree-web-drop-in-react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Game from '../assets/images/91vyVfjkQzS._SY550_.jpg';

const Checkout = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    street: "",
    city: "",
    country: "",
    state: "",
    zipcode: "",
  });

  const [clientToken, setClientToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
      instance: {}
  });

  const [orderAttempted, setOrderAttempted] = useState(false);

  const { first_name, email, street, city, country, state, zipcode } = formData;

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      try {
        const res = await axios.get('http://localhost:8000/api/payment/generate-token', config);

        if (res.status === 200) {
          setClientToken(res.data.token);
          setLoading(false);
          setProcessingOrder(false)
        }
      } catch(err) {

      }
    }
    fetchData();
  }, [])

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/\ /g, ""),
    });

  const onAddressChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formStyling = orderAttempted
    ? "needs-validation was-validated"
    : "needs-validation";

    const buy = async e => {
      e.preventDefault();

      if (
          first_name !== '' &&
          email !== '' &&
          street !== '' &&
          city !== '' &&
          country !== '' &&
          state !== '' &&
          zipcode !== ''
      ) {
          const config = {
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
          };

          let { nonce } = await data.instance.requestPaymentMethod();

          setProcessingOrder(true);

          const body = JSON.stringify({
              first_name,
              email,
              street,
              city,
              country,
              state,
              zipcode,
              nonce
          });

          try {
              const res = await axios.post('http://localhost:8000/api/payment/process-payment', body, config);

              if (res.status === 201) {
                   setSuccess(true);
              }
          } catch(err) {

          }

          setProcessingOrder(false);
      }
  };

  if (success) 
    return (
      <Navigate to='/thank-you' />
    )
  

  return (
    <Layout title="Checkout" content="">
      <h1 className="display-4 mt-5 mb-5">Checkout Page</h1>
      <div className="row mb-5">
        <div className="col-5">
          <form className={formStyling} noValidate onSubmit={buy}>
            <h3 className="mb-5 display-6">Your Information</h3>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="first_name">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                name="first_name"
                placeholder="First Name*"
                onChange={onChange}
                value={first_name}
                required
              />
              <div className="invalid-feedback">
                Please Enter Your First Name
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="email">
                Email*
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email*"
                onChange={onChange}
                value={email}
                required
              />
              <div className="invalid-feedback">Please Enter Your Email</div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="street">
                Street*
              </label>
              <input
                className="form-control"
                type="text"
                name="street"
                placeholder="Street*"
                onChange={onChange}
                value={street}
                required
              />
              <div className="invalid-feedback">Please Enter Your City</div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="city">
                City*
              </label>
              <input
                className="form-control"
                type="text"
                name="city"
                placeholder="City*"
                onChange={onAddressChange}
                value={city}
                required
              />
              <div className="invalid-feedback">Please Provide City</div>
            </div>
            <div className="row mb-5 mt-3">
              <div className="col-5">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="country">
                    Country*
                  </label>
                  <select
                    className="form-select"
                    name="country"
                    onChange={onAddressChange}
                    value={country}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="united_states">United States</option>
                    <option value="canada">Canada</option>
                  </select>
                  <div className="invalid-feedback">Please Provide Country</div>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="city">
                    State/Province*
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="state"
                    placeholder="State*"
                    onChange={onAddressChange}
                    value={state}
                    required
                  />
                  <div className="invalid-feedback">
                    Please Provide State/Province
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="zipcode">
                    ZipCode*
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="zipcode"
                    placeholder="Zip Code*"
                    onChange={onAddressChange}
                    value={zipcode}
                    required
                  />
                  <div className="invalid-feedback">
                    Please Enter Your Zip Code
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mb-5 display-6">Payment Information</h3>
            {
                loading || clientToken === null ? (
                    <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                        <Loader 
                        type="Ovel"
                        color="#08bfff"
                        width={50}
                        height={50}
                        />
                        </div>
                ) : (
                    <DropIn
                        options={{
                            authorization: clientToken,
                            paypal: {
                              flow: 'vault'
                            }
                        }}
                        onInstance={ instance => setData({ instance: instance })}
                        />
                )
            }
            {
              processingOrder ? (
                <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                <Loader 
                        type="Ovel"
                        color="#08bfff"
                        width={50}
                        height={50}
                        />
                        </div>
              ) : (
                <div>
                  {
                    loading ? (
                      <Fragment></Fragment>
                    ) : (
                      <button
              className="btn btn-success btn-lg mt-5 shadow"
              onClick={() => setOrderAttempted(true)}
              type="submit"
            >
              Place Order
            </button>
                    )
                  }
                </div>
              )
            }
           
            
          </form>
        </div>
        <div className="offset-1 col-6">
          <h3 className="display-6 mb-5">Order Details:</h3>
          <div className="row">
            <div className="col-4">
              <img 
              className="img-fluid"
              src={Game}
              alt="Mini Shop Game"
              />
            </div>
            <div className="offset-1 col-7 mt-3">
              <p className="fs-5 lead">
                Order Item: Mini Shop Game
              </p>
              <p className="lead fs-3">
                <strong>Order Total: (CAD) $47.99</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
