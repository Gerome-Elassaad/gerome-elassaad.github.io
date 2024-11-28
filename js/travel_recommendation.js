document.getElementById('search-button').addEventListener('click', async () => {
  const query = document.getElementById('search-bar').value.toLowerCase().trim();

  try {
    const response = await fetch('travel_recommendation_api.json');
    if (!response.ok) throw new Error('Failed to fetch data.');

    const data = await response.json();
    console.log('Fetched data:', data);

    let results = [];
    if (query.includes('beach')) {
      results = data.beaches;
    } else if (query.includes('temple')) {
      results = data.temples;
    } else {
      results = data.countries.flatMap(country => country.cities);
    }

    const resultsContainer = document.getElementById('results');
    if (results.length > 0) {
      resultsContainer.innerHTML = results.map(item => `
        <div class="result-card">
          <h3>${item.name}</h3>
          <img src="${item.imageUrl}" alt="${item.name}" onerror="this.src='images/placeholder.jpg';">
          <p>${item.description}</p>
        </div>
      `).join('');
    } else {
      resultsContainer.innerHTML = '<p>No results found. Try searching for beaches, temples, or cities.</p>';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('results').innerHTML = '<p>Failed to load results. Please try again later.</p>';
  }
});
