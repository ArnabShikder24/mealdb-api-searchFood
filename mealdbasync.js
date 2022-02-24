// only for practice, this JS file has no connection with the HTML file
//catch, try, async, await
const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json()
        displaySearchResult(data.meals)  
    }
    catch(error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
    }
    
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displaySearchResult(data.meals))
}
searchFood();

const displaySearchResult = meals => {
    const errorMessage = document.getElementById('error-message');
    const searchDiv = document.getElementById('search-result');
    // clear data
    searchDiv.textContent = '';
    if(meals == null) {
        errorMessage.style.display = 'block';
    }
    else {
            meals.forEach(meal => {
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

const loadMealDetail = async mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0])  
    }
    catch(error) {
        console.log(error);
    }

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetails(data.meals[0]))
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

