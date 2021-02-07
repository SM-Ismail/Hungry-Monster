const searchByFoodName = foodName => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}
    `)
    .then(res => res.json())
    .then(data => {
        const namePicked = data.meals[0].strMeal;
        const thumbPicked = data.meals[0].strMealThumb
        const divFood = document.createElement('div');
        divFood.className = 'food';
        divFood.innerHTML = `
            <img src=${thumbPicked} class="img-thumbnail">
            <h3 id = "mealName">${namePicked}</h3>
        `;
        document.getElementById("idBigDiv").appendChild(divFood);        
    })
    .catch(err => {
        const notFound = document.createElement('div');
        notFound.id = 'notFound';
        notFound.innerHTML= `
            <h2>Couldn't find your search. Aren't you <span>HUNGRY</span>? Search for your favorite food with the name of the dish or it's category  or even with the origin area of the dish. Guten Apetit!</h2>
            `;
        document.getElementById('container').appendChild(notFound);
    })
}
const searchByCategory = category => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}
    `)
    .then(res => res.json())
    .then(data => {
        const meals = data.meals;
        meals.forEach(element => {
            const name = element.strMeal;
            searchByFoodName(name);
        });
    })
    .catch(err => {
        searchByFoodName(category);
    });    
}

const searchByArea = area => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}
    `)
    .then(res => res.json())
    .then(data => {
        const meals = data.meals;
        meals.forEach(element => {
            const name = element.strMeal;
            searchByFoodName(name);
        });
    })
    .catch(err => {
        searchByCategory(area);
    });    
}
const foodShow = document.createElement('div');
foodShow.id = 'foodShow';
document.getElementById("showArea").appendChild(foodShow);
document.getElementById('idBigDiv').addEventListener('click', function(event){
    const getName = event.target.innerText;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getName}`)
    .then(res => res.json())
    .then(data => {
        const foodArea = data.meals[0].strArea;
        const foodCategory = data.meals[0].strCategory;
        foodShow.innerHTML = `
            <img src = "${data.meals[0].strMealThumb}">
            <h2>${getName}</h2>
            <h3>Category: ${foodCategory}</h2>
            <h3>Area of Origin: ${foodArea}</h3>
        `;
    });
});

document.getElementById("button").addEventListener('click', function(){
    const inputRead = document.getElementById("input").value;
    searchByArea(inputRead);
    console.log(inputRead);
    
});
