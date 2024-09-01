import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";
import Footer from '../components/Common/Footer';

function DashboardPage() {
  const [coins, setCoins] =  useState([]);
  const [paginatedCoins, setPaginatedCoins] =  useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(filteredCoins.slice(previousIndex, previousIndex + 10));
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = search 
    ? coins.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.symbol.toLowerCase().includes(search.toLowerCase()))
    : coins;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();
      if  (myCoins) {
        setCoins(myCoins);
        setPaginatedCoins(myCoins.slice(0, 10));
        setIsLoading(false);}
  }
  

  useEffect(() => {
    handlePageChange(null, page);
  }, [handlePageChange, page]);

  return (
    <>
      <Header />
      <BackToTop/>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={paginatedCoins} />
          {!search && (
            <PaginationComponent 
              page={page} 
              handlePageChange={handlePageChange} 
              count={Math.ceil(filteredCoins.length / 10)} 
            />
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export default DashboardPage;
