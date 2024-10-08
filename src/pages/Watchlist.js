import React from 'react';
import Button from '../components/Common/Button';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import { useState, useEffect } from 'react';
import { get100Coins } from '../functions/get100Coins';
import Footer from '../components/Common/Footer';
  
function Watchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      if (watchlist) {
        getData();
      }
    }, []);
  
    const getData = async () => {
      const allCoins = await get100Coins();
      if (allCoins) {
        setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
      }
      setIsLoading(false);
    };
  
    return (
      <div>
        <Header />
        {watchlist?.length > 0 ? (
          <TabsComponent coins={coins} />
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>
              Sorry, No Items In The Watchlist.
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
              }}
            >
              <a href="/dashboard">
                <Button text="Dashboard" />
              </a>
            </div>
          </div>
        )}
        <Footer/>
      </div>
    );
  }
  
  export default Watchlist;