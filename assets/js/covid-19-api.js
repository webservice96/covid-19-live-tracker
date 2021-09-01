/**
 * getCovidInfo
 */
const getCovidInfo = async() => {
    const url = 'https://api.covid19api.com/summary';
    const res = await fetch(url);
    const data = await res.json();
    displayCovidData(data);
}
getCovidInfo();


/* dom element */
const TotalConfirmed = document.getElementById('TotalConfirmed');
const TotalDeaths = document.getElementById('TotalDeaths');
const NewConfirmed = document.getElementById('NewConfirmed');
const countryContainer = document.getElementById('country-covid-container');
const countrySelector = document.getElementById('country-selector');


/**
 * displayCovidData
 * @param {Object} data 
 */
const displayCovidData = async(data) => {
    try {
        const global = await data.Global;
        const countries = await data.Countries;
        /* global data implement */
        TotalConfirmed.innerText = global.TotalConfirmed;
        TotalDeaths.innerText = global.TotalDeaths;
        NewConfirmed.innerText = global.NewConfirmed;

        /* country data implement */
        for (country of countries) {
            /* create country option dom */
            const option = document.createElement('option');
            option.setAttribute('value', country.Slug);
            option.innerText = country.Country;
            countrySelector.appendChild(option);

            /* set single country data */
            const countryDiv = document.createElement('div');
            const classes = ['col-sm-10', 'col-md-8', 'col-lg-4'];
            countryDiv.classList.add(...classes);
            countryDiv.innerHTML = `
            <div class="box2">
                <div class="box2-content">
                    <h4 class="sing-item title"><strong>Country: </strong> ${country.Country}</h4>
                    <p class="sing-item"><strong>মোট আক্রান্তঃ ${country.TotalConfirmed}</strong></p>
                    <p class="sing-item"><strong>মোট মৃতঃ ${country.TotalDeaths}</strong></p>
                </div>
            </div>
            `;
            countryContainer.appendChild(countryDiv);
        }
    } catch (err) {
        console.log(err);
    }
}


/**
 * country select event handler
 */
$('#country-selector').on('select2:select', async(event) => {
    const url = 'https://api.covid19api.com/summary';
    try {
        const res = await fetch(url);
        const resData = await res.json();
        const searchedCountry = event.params.data.id;
        console.log(searchedCountry);
        if ('all-countries' !== searchedCountry) {
            countryContainer.innerHTML = '';
            const countrySingleDiv = document.createElement('div');
            const classes = ['col-sm-10', 'col-md-8', 'col-lg-8'];
            countrySingleDiv.classList.add(...classes);
            const selectedCountry = [];
            for (const country of resData.Countries) {
                if (country.Slug.indexOf(searchedCountry) != -1) {
                    selectedCountry.push(country);
                }
            }
            countrySingleDiv.innerHTML = `
            <div class="box2">
                <div class="box2-content">
                    <h4 class="sing-item title"><strong>Country: </strong> ${selectedCountry[0].Country}</h4>
                    <p class="sing-item"><strong>মোট আক্রান্তঃ ${selectedCountry[0].TotalConfirmed}</strong>
                    </p>
                    <p class="sing-item"><strong>মোট মৃতঃ ${selectedCountry[0].TotalDeaths}</strong></p>
                </div>
            </div>
        `;
            countryContainer.appendChild(countrySingleDiv);
        } else {
            countryContainer.innerHTML = '';
            getCovidInfo();
        }
        // console.log(selectedCountry[0]);
    } catch (err) {
        console.log(err);
    }
});