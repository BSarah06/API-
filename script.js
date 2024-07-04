document.addEventListener('DOMContentLoaded', function() {
    const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

    function fetchCryptoData() {
        fetch(apiURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                displayCryptoData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('crypto-data').innerText = 'Error fetching data. Please check the console for more details.';
            });
    }

    function displayCryptoData(data) {
        const cryptoDiv = document.getElementById('crypto-data');
        let cryptoHTML = '<table><tr><th>Rank</th><th>Name</th><th>Symbol</th><th>Price (USD)</th></tr>';
        data.forEach(coin => {
            cryptoHTML += `
                <tr>
                    <td>${coin.market_cap_rank}</td>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                </tr>
            `;
        });
        cryptoHTML += '</table>';
        cryptoDiv.innerHTML = cryptoHTML;
    }

    fetchCryptoData();
});
