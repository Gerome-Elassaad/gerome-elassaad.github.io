document.getElementById('search-button').addEventListener('click', async () => {
  const query = document.getElementById('search-bar').value.toLowerCase().trim();

  // Clear the results before displaying new ones
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  try {
    const response = await fetch('travel_recommendation_api.json');
    if (!response.ok) throw new Error('Failed to fetch data.');

    const data = await response.json();

    let results = [];
    if (query.includes('beach')) {
      results = data.beaches;
    } else if (query.includes('temple')) {
      results = data.temples;
    } else {
      results = data.countries.flatMap(country =>
        country.cities.filter(city => city.name.toLowerCase().includes(query))
      );
    }

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
    resultsContainer.innerHTML = '<p>Failed to load results. Please try again later.</p>';
  }
});

document.getElementById('clear-button').addEventListener('click', () => {
  document.getElementById('search-bar').value = '';
  document.getElementById('results').innerHTML = '';
});
