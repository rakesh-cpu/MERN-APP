import React from "react";
import { Card, Row, Col } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../App/cartSlice";
import Loader from "./Loader";

function AddToCart() {
  const [isHovered, setisHovered] = useState(null);
  const dispatch = useDispatch();
  const handleMouseEnter = (currencyId) => {
    setisHovered(currencyId);
  };

  const handleMouseLeave = () => {
    setisHovered(null);
  };

  const cartCoins = useSelector((state) => state.cart);
  const { data: cryptosList, isFetching } = useGetCryptosQuery(100);
  if (isFetching) return <Loader />;

  const matchingCrypto = cryptosList?.data?.coins.filter((coins) =>
    cartCoins.cart.includes(coins.uuid)
  );

  console.log("total coins", cartCoins.cart);

  const remove = (uuid) => {
    console.log("uuid", uuid);
    dispatch(removeFromCart(uuid));
    console.log("cart", cartCoins.cart);
  };
  console.log("matching crypto", matchingCrypto);

  return (
    <>
      <h3 className="wish-list">Total coins :{cartCoins.cart.length}</h3>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {matchingCrypto?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
                onMouseEnter={() => handleMouseEnter(currency.uuid)}
                onMouseLeave={handleMouseLeave}
                style={{
                  background:
                    isHovered === currency.uuid
                      ? "linear-gradient(68.6deg, rgb(252, 165, 241) 1.8%, rgb(181, 255, 255) 100.5%)"
                      : "white",
                }}
              >
                <p
                  style={{
                    color: isHovered === currency.uuid ? "red" : "blue",
                    font: "10px",
                  }}
                >
                  Price: {millify(currency.price)}
                </p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
            <button
              className="watchlist-button"
              style={{background: 'red', color: 'white'}}
              onClick={() => remove(currency?.uuid)}
            >
              remove {currency?.uuid}
            </button>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default AddToCart;
