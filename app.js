const mn = document.querySelector(".moviename");
const ml = document.querySelector(".movielanguage");
const mg = document.querySelector(".moviegenres");
const mr = document.querySelector(".movierating");
const md = document.querySelector(".moviedetails");
const input = document.querySelector(".searchTerm");
const form = document.querySelector("form");
const img = document.querySelector("img");

let searchword = "";
let genrelist= "";
let rating = 0;

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    searchword = input.value;
    getMovieDetails();
})

const getMovieDetails = async ()=>{
    try{
        if(searchword !== ""){
            const rawdata = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${searchword}`)
            const data = await rawdata.json();

            (data.genres).forEach((genre)=> genrelist = genrelist + genre + ", ");
            if(data.rating.average !== null) 
                rating = data.rating.average;
            else
                rating = "Not rated";
            printMovieDetails(data);
        }
        else{
            alert("Enter movie name");
        }
    }
    catch(e){
        alert("No movie found!!!")
    }
}
const printMovieDetails = async (info)=>{
    try{    
        md.style.display = "flex";
        mn.innerText = `Name: ${info.name}`;
        ml.innerText = `Language: ${info.language}`;
        mg.innerText = `Genres: ${genrelist}`;
        mr.innerText = `Rating: ${rating}`;
        if(info.image !==null){
            img.style.display = "block";
            img.src = info.image.medium;
        }
        else    
            img.style.display = "none"    
        console.log(info)
        searchword = "";
        genrelist= "";
        rating = 0;
    }
    catch(e){
        alert("No movie found!!!" + e)
    }
}


