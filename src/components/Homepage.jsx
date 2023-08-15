import React from 'react';
import { Col, Row, Typography, Select , Statistic} from 'antd';
import millify from 'millify';
import {Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '.';
import Loader from './Loader';


const { Title } = Typography;
const Home = () => {
    const {data, isFetching} = useGetCryptosQuery(10);
    // console.log(data);
    const globalStats = data?.data?.stats;
    if(isFetching) return <Loader/>;
    return (
        <>
        <div style={{ background: '#f0f0f0', padding: '20px' }}>
          <Title level={2} className="heading" style={{color:'red',textAlign:'center'}}>Global Cryptography Statistics</Title>
          <Row style={{textAlign:'center'}}>
            <Col span={12}><Statistic title='Total Exchanges' value={globalStats.total}/></Col>
            <Col span={12}><Statistic title='Total Market' value={millify(globalStats.totalExchanges)}/></Col>
            <Col span={12}><Statistic title='Total 24 hours Volume' value={millify(globalStats.totalMarketCap)}/></Col>
            <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.total24hVolume)}/></Col>
            <Col span={12}><Statistic title='Total Cryptocurrencies' value={millify(globalStats.totalMarkets)}/></Col>

          </Row>
          </div>
          <div className='home-heading-container'>
            <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
            <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
          </div>
            
          <Cryptocurrencies simplified={true}/>
          <div className='home-heading-container'>
            <Title level={2} className='home-title'>Latest Crypto News</Title>
            <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
          </div>
          <News simplified/>


        </>
    )
}
export default Home;