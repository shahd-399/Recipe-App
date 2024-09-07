let searchInput = document.getElementById('search');
let recipesRow = document.getElementById('recipesRow');

searchInput.addEventListener('input',function(e){
    var term =searchInput.value.toLowerCase().trim();
    if(term !=''){
        getRecipes(term)
    }
})


//get Recipes by name
let listOfRecipes = [];
async function getRecipes(name){
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let data = await url.json();
    listOfRecipes = data.meals;

    if(listOfRecipes != null){
        displayRecipes(listOfRecipes);
    }
    else{
        listOfRecipes = []
        recipesRow.innerHTML = `<h2 class="text-danger fw-bold text-center">No Data</h2>`
    }
}
// display Recipes
function displayRecipes(arr){
    let box = '';
    for(let i = 0; i < arr.length; i++){
        box +=`
        <div class="col-md-3">
        <div class="card">
            <img src="${arr[i].strMealThumb}" class="card-img-top w-100" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">${arr[i].strMeal
                }</h5>
                <button onclick="getRecipesDetails(${arr[i].idMeal})" class="btn d-block m-auto">Get Recipe</button>
            </div>
        </div>
    </div>
        `
    }

    recipesRow.innerHTML = box;
}

let recipeDetails = {}
async function getRecipesDetails(id){
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await url.json();
    recipeDetails = data.meals[0];
    displayDetails(recipeDetails)
}

let searchArea = document.querySelector('.head .search-area');
let detailsBox = document.querySelector('.head .recipe-details');


function displayDetails(myObj){
    scroll({
        top:0,
        behavior:'smooth'
    })
    searchArea.classList.add('d-none');
    let box =`
    <div class="container p-5 mt-4 position-relative">
        <i class="fa-solid fa-xmark rounded-circle position-absolute top-0 end-0 d-flex justify-content-center align-items-center" id="closeDetails"></i>
        <div class="d-flex g-4 ">
            <img src="${myObj.strMealThumb}" alt=""class="rounded-2 mb-2">
            <div class="text px-4">
                <h1>${myObj.strMeal}</h1>
                <p>${myObj.strInstructions}</p>
                <a href="${myObj.strYoutube}" role="button" class="btn btn-danger" target="_blank">Youtube</a>
            </div>
        </div>
    </div>`
    detailsBox.innerHTML = box;


    let closeDetails = document.getElementById('closeDetails');
    closeDetails.addEventListener('click',function(){
        searchArea.classList.remove('d-none');
        detailsBox.innerHTML='';
    })
}
