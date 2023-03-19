document.getElementById('erorr').style.display = 'none'
const searchButton = () => {
    const searchINputField = document.getElementById('search-input');
    const searchValue = searchINputField.value;

    if (searchINputField.value == '') {
        document.getElementById('erorr').style.display = 'block'
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(response => response.json())
            .then(json => DisplaySearch(json.meals))
        document.getElementById('erorr').style.display = 'none'
    }

}
const DisplaySearch = (meals) => {
    // console.log(meals);
    const searchDiv = document.getElementById('displayProduct');
    searchDiv.innerHTML = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div onclick="loadDetails(${meal.idMeal})" class="card h-100">
        <img src="${meal?.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal?.strMeal}</h5>
            <p class="card-text">${meal?.strInstructions.slice(0, 80)}</p>
            <a class="btn btn-primary" target="_blank" href="${meal?.strYoutube}">Meal Video</a>
        </div>
    </div>
        `
        searchDiv.appendChild(div)
    })
}

const loadDetails = (idmeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}`
    fetch(url)
        .then(res => res.json())
        .then(json => displayDetails(json.meals[0]))
}
const displayDetails = (meal) => {
    console.log(meal);
    const DisplayDiv = document.getElementById("show-Detailss");
    DisplayDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('show');
    div.innerHTML = `
    <img src="${meal?.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body top">
            <h5 class="card-title"><b>${meal?.strMeal}</b></h5>
            <p class="card-text">Meal ID: <b>${meal?.idMeal}</b></p>
            <p class="card-text">Area: <b>${meal?.strArea}</b></p>
            <p class="card-text">Category: <b>${meal?.strCategory}</b></p>
            <p class="card-text">Tags: <b>${meal?.strTags}</b></p>
            <p class="card-text">${meal?.strInstructions.slice(0, 100)}</p>
        </div>
    `
    DisplayDiv.appendChild(div)
}
