import React, { useState,useEffect } from "react";
import axios from "axios";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [ timePeriod, settimePeriod ] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  // console.log(data?.data?.coin);
  // const { data:coinHistory ,isLoading,isUninitialized } = useGetCryptoHistoryQuery(coinId,timePeriod);
  // if(isLoading)
  // {
  //   return <div>Loading....</div>
  // }
  // if(isUninitialized) return <div>failed</div>
  // console.log("here is the timeperiod",timePeriod)
  const [coinHistory,setCoinHistory] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCoinHistory = async () => {
      const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`, 
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl', 
          timePeriod: timePeriod, 
        },
        headers: {
          'X-RapidAPI-Key': 'e3bdc0e3e6mshabcee6861650d4ap19d52bjsn608337d46ee4',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        
        setCoinHistory(response.data);
        setIsLoading(false);
        console.log("Data fetched successfully", response.data);
      } catch (error) {
        console.error("Error fetching crypto history:", error);
        setIsLoading(false);
      }
    };

    fetchCoinHistory();
  }, [coinId, timePeriod]);




  console.log("coin history",coinHistory)
  const cryptoDetails = data?.data?.coin;

  console.log("cryptoDetails",cryptoDetails)

  if (!cryptoDetails) return <div><Loader/></div>;


  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to rupees",
      value: `\u20B9 ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `\u20B9 ${
        cryptoDetails?.volume && millify(cryptoDetails?.volume)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `\u20B9 ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `\u20B9 ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      
      <div>
        <Col className="coin-details-container">
          <Col className="coin-heading-container">
            <Title level={2} className="coin-name">
              {cryptoDetails?.name} ({cryptoDetails?.slug}) price
            </Title>
            <p>
              {cryptoDetails?.name} live price in Indian rupees. View value
              statistics, market cap and supply.
            </p>
          </Col>
          <Select
            defaultValue="7d"
            className="select-timeperiod"
            placeholder="select-timeperiod"
            onChange={(value) => settimePeriod(value)}
          >
            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>
          {/* line chart component part  */}
          <LineChart coinHistory = {coinHistory} currentPrice = {millify(cryptoDetails?.price)} coinName={cryptoDetails?.name}/>

          <Col className="stats-container">
            <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  {CryptoDetails?.name} value Statistics
                </Title>
                <p>An overview showing the {CryptoDetails?.name} stats</p>
              </Col>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Col className="stats">
                    <Text>{value}</Text>
                  </Col>
                </Col>
              ))}
            </Col>
            <Col className="other-stats-info">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  Other Statistics
                </Title>
                <p>An overview showing all cryptoCurrencies</p>
              </Col>
              {genericStats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Col className="stats">
                    <Text>{value}</Text>
                  </Col>
                </Col>
              ))}
            </Col>
          </Col>
          <Col className="coin-desc-link">
            <Row className="coin-desc">
              <Title level={3} className="coin-details-heading">
                What is {cryptoDetails?.name}
              </Title>
              <Title level={4} className="coin-details-heading">
                {HTMLReactParser(cryptoDetails?.description)}
              </Title>
            </Row>
            {/* coin links portion */}
            <Col className="coin-links">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails?.name} Links
              </Title>
              {/* mapping on links */}
              {cryptoDetails.links?.map((link) => (
                <Row className="coin-link" key={link.name}>
                  <Title level={5} className="link-name">
                    {link.type}
                  </Title>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Row>
              ))}
            </Col>
          </Col>
        </Col>
      </div>
    </>
  );
};
export default CryptoDetails;
