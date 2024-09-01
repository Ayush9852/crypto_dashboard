import React, { useState } from 'react';
import "./styles.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { saveItemToWatchlist } from '../../../functions/saveItemToWatchlist';
import { removeItemToWatchlist } from '../../../functions/removeItemToWatchlist';


function List({coin, delay}) {

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const [isCoinAdded, setIsCoinAdded] = useState(watchlist.includes(coin.id));

    const handleWatchlistClick = (e) => {
        e.preventDefault();
        if (isCoinAdded) {
          removeItemToWatchlist(e, coin.id, setIsCoinAdded);
        } else {
          saveItemToWatchlist(e, coin.id);
          setIsCoinAdded(true);
        }
      };

  return (
    <Link to={`/coin/${coin.id}`}>
    <motion.tr
        className='list-row'
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
    <tr className='list-row'>
        <Tooltip title="Coin Logo" placement="bottom-start">
        <td className='td-image'>
            <img src={coin.image} className='coin-logo'/>
        </td>
        </Tooltip>
        <Tooltip title="Coin Info">
        <td>
            <div className='name-col'>
                <p className='coin-symbol'>{coin.symbol}</p>
                <p className='coin-name'>{coin.name}</p>
            </div>
        </td>
        </Tooltip>
        <Tooltip title="Price Change In 24Hrs" placement="bottom-start">
        {coin?.price_change_percentage_24h > 0 ? (
            <td className='chip-flex'>
                <div className='price-chip'>
                +{coin?.price_change_percentage_24h?.toFixed(2)}%
                </div>
                <div className='icon-chip td-icon'>
                    <TrendingUpRoundedIcon/>
                </div>
            </td>
        ) : (
            <td className='chip-flex'>
                <div className='price-chip chip-red'>
                {coin?.price_change_percentage_24h?.toFixed(2)}%
                </div>
                <div className="icon-chip chip-red td-icon">
                    <TrendingDownRoundedIcon/>
                </div>
            </td>
        )}
        </Tooltip>
            <Tooltip title="Current Price" placement="bottom-start">
            <td>
                <h3 className='coin-price td-align-center' style={{
                    color:
                    coin.price_change_percentage_24h < 0 
                    ? "var(--red)" 
                    : "var(--green)"
                    }}
                >
                    ${coin?.current_price?.toLocaleString()}
                </h3>
            </td>
            </Tooltip>
        <Tooltip title="Total Volume" placement="bottom-end">
        <td>
            <p className='total_volume td-align-right td-total-volume'>
                ${
                    typeof coin?.total_volume === 'number'
                    ? coin.total_volume.toLocaleString()
                    : typeof coin?.total_volume?.usd === 'number'
                    ? coin.total_volume.usd.toLocaleString()
                    : ''
                }
            </p>
        </td>

 
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-end">
        <td className='desktop-td-mkt'>   
            <p className='total_volume td-align-right'>
                ${coin.market_cap?.toLocaleString()}
            </p>
        </td>
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-end">
        <td className='mobile-td-mkt'>   
            <p className='total_volume td-align-right'>
                ${convertNumber(coin.market_cap)}
            </p>
        </td>
        </Tooltip>
    </tr>
    <td
          className={`watchlist-icon ${
            coin.price_change_percentage_24h < 0 ? "watchlist-icon-red" : ""
          }`}
          onClick={handleWatchlistClick}
        >
          {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
        </td>
      </motion.tr>
    </Link>
  )
}

export default List;
  