// DOM element to display data
const dataContainer = document.getElementById('data-container');

// Function to display data in the HTML
function displayData(data: any) {
  if (!dataContainer) return;
  
  let html = '<h2>Latest BTC and ETH Prices</h2>';
  html += '<table border="1" style="width:100%; border-collapse: collapse;">';
  html += '<tr><th>Currency</th><th>Price (USD)</th></tr>';
  
  // Format and display the data
  data.forEach((item: any) => {
    const price = parseFloat(item.price).toFixed(2);
    html += `<tr><td>${item.symbol}</td><td>$${price}</td></tr>`;
  });
  
  html += '</table>';
  dataContainer.innerHTML = html;
}

const binanceApiUrl = 'https://api.binance.com/api/v3/ticker/price';
const symbols = ['BTCUSDT', 'ETHUSDT'];
const params = {
  symbol: symbols.join(','),
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

