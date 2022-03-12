// search iteractive with Enter Button
const searchInput = document.getElementById('search-field');
const buttonSearch = document.getElementById('button-search');
searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        buttonSearch.click();
    }
});

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
    .catch(error => catchError(error))
}
searchFood();

// catch error function
const catchError = error => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
}

const displaySearchResult = meals => {
    const errorMessage = document.getElementById('error-message');
    const searchDiv = document.getElementById('search-result');
    // clear data
    searchDiv.textContent = '';
    if(meals == null) {
        errorMessage.style.display = 'block';
    }
    else {
        errorMessage.style.display = 'none';
        // only 10 item show
        const sliceFood = meals.slice(0, 10);
        sliceFood.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}...</p>
                    <button onclick="loadMealDetail('${meal.idMeal}')" class="btn btn-success">Details</button>
                </div>
            </div>
            `;
            searchDiv.appendChild(div);
        })
    }
}

const loadMealDetail = mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    const wraper = document.querySelector(".wrap");
    const mealDetail = document.getElementById('meal-details');
    mealDetail.innerHTML = `
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p>
        <a class="btn btn-success" target="_blank" href="${meal.strYoutube}">Recipe</a>
    `
    // show popup
    wraper.style.display = "block";
}

// PopUp close 
const wraper = document.querySelector(".wrap")
const cross = document.querySelector(".x")

cross.addEventListener("click", () => {
    wraper.style.display = "none";
});

