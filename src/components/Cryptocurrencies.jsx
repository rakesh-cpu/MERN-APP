import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';


import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
// import { addToCart } from '../App/cartSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../App/cartSlice';


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovered,setisHovered] = useState(null);

  const dispatch = useDispatch();

  const handleMouseEnter = (currencyId) =>{
    setisHovered(currencyId);
  }

  const handleMouseLeave = () =>{
    setisHovered(null);
  }

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  const Cart = (product) => {
    dispatch(addToCart(product));
  };



  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
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
                onMouseEnter={()=>handleMouseEnter(currency.uuid)}
                onMouseLeave={handleMouseLeave}
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
                {/* {isHovered===currency?.uuid && (
                  <Button type="primary" className='watchlist-button'>
                    <HeartFilled />
                  </Button>
                )} */}
              
              </Card>

            </Link>
            <button className="watchlist-button" 
               onClick={()=>Cart(currency.uuid)}
               >Add to Watchlist</button>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;