import axios from 'axios';
import { DataFrame } from 'pandas-js';

// DOM element to display data
const dataContainer = document.getElementById('data-container');

// Create an empty DataFrame to store our data
const dfExisting = new DataFrame();

// Function to display data in the HTML
function displayData(data: any) {
  if (!dataContainer) return;
  
  let html = '<h2>BTC Price Data (Last 6 hours)</h2>';
  html += '<table border="1" style="width:100%; border-collapse: collapse;">';
  html += '<tr><th>Time</th><th>Price (USD)</th></tr>';
  
  // Format and display the data
  for (let i = 0; i < data.length; i++) {
    const timestamp = new Date(data[i].openTime).toLocaleTimeString();
    const price = parseFloat(data[i].close).toFixed(2);
    html += `<tr><td>${timestamp}</td><td>$${price}</td></tr>`;
  }
  
  html += '</table>';
  dataContainer.innerHTML = html;
}

interface BinanceResponse {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
  ignore: string;
}

const binanceApiUrl = 'https://api.binance.com/api/v3/klines';
const symbol = 'BTCUSDT';
const interval = '1h';
const limit = 6;

const params = {
  symbol,
  interval,
  limit,
};

// Fetch data from Binance API
axios.get(binanceApiUrl, { params })
  .then((response: any) => {
    const data: BinanceResponse[] = response.data;
    const df = new DataFrame(data);

    // Convert the "close" column to a number
    df.addColumn('Close', df.get('close').map(Number));

    // Add the DataFrame as a new column to your existing DataFrame
    dfExisting.addColumn('BTC Price (Last 6 hours)', df.get('Close'));
    
    // Display the data in the HTML
    displayData(data);
    
    console.log('Data loaded successfully:', data);
    return data;
  })
  .catch((error: any) => {
    console.error('Failed to retrieve data from Binance:', error);
    if (dataContainer) {
      dataContainer.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
  });
