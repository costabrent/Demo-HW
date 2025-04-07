import axios from 'axios';

// DOM element to display data
const dataContainer = document.getElementById('data-container');

// Function to display data in the HTML
function displayData(data: any) {
  if (!dataContainer) return;
  
  let html = '<h2>BTC Price Data (Last 6 hours)</h2>';
  html += '<table border="1" style="width:100%; border-collapse: collapse;">';
  html += '<tr><th>Time</th><th>Price (USD)</th></tr>';
  
  // Format and display the data
  for (let i = 0; i < data.length; i++) {
    const timestamp = new Date(data[i][0]).toLocaleTimeString();
    const price = parseFloat(data[i][4]).toFixed(2);
    html += `<tr><td>${timestamp}</td><td>$${price}</td></tr>`;
  }
  
  html += '</table>';
  dataContainer.innerHTML = html;
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
    const data = response.data;

    
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
