const inputBox = document.querySelector('.inputBox');
const movieSearchBTN = document.querySelector('.movieSearchBTN');
const allMovieBTN = document.querySelector('.allMovieBTN');
const backBtn = document.querySelector('.backBtn');
const movieRatingStar = document.querySelectorAll('.movieRatingStars');
const deleteBtn = document.querySelector(".deleteBtn");
const topRatedBtn = document.querySelector(".topRatedBtn");
const nameInput = document.querySelector(".nameInput");
const submitRatingBTN = document.querySelector(".submitRatingBTN");
const uCName = document.querySelector(".uCName");
const uCInput = document.querySelector(".uCInput");
const postBtn = document.querySelector(".postBtn");
const updateBtn = document.querySelector(".updateBtn");
const pages = document.querySelectorAll(".page");
const end = inputBox.value.length;

let value;
const API_URL = window.location.origin;
let isRated = false;
let currentRating = -1;
let nameInputValue = "";
inputBox.focus();
inputBox.setSelectionRange(end, end);

inputBox.addEventListener("input", (e) => {
    value = e.target.value.trim();
    isSearch = true;
});

inputBox.addEventListener("keydown", (e)=> {
    if(e.code === "Enter") {
        movieSearchBTN.click();
    }
})

if(movieSearchBTN) {
 
    movieSearchBTN.addEventListener("click", () => {
        if(value != undefined) {
            console.log("Searching...");
            window.location.href = `${API_URL}?q=${value}`;
            inputBox.setSelectionRange(end, end);
        }
    })
}

if(allMovieBTN){
    allMovieBTN.addEventListener("click", () => {
        window.location.href = `${API_URL}`;
        inputBox.setSelectionRange(end, end);
    })
}

document.querySelectorAll('.card').forEach(movie => {
    movie.addEventListener("click", async () => {
        window.location.href = `${API_URL}/movies/${movie.dataset.id}`
    })
});


if(backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = `${API_URL}/`;
    })
}

if(nameInput) {
    submitRatingBTN.disabled = true;
    submitRatingBTN.style.pointerEvents = "none";

    nameInput.addEventListener("input", (e) => {
        nameInputValue = e.target.value.trim();
        const isValid = nameInputValue.length > 0;
        submitRatingBTN.disabled = !isValid;
        submitRatingBTN.style.pointerEvents = isValid ? "auto" : "none";
    });

    submitRatingBTN.addEventListener("click", async () => {
        if (!nameInputValue || submitRatingBTN.disabled) return;
        console.log("clicked");
        await rateMovie(
            window.location.pathname.split("/")[2],
            currentRating + 1,
            nameInputValue
        );
        alert(`You Rated ${currentRating + 1} to ${submitRatingBTN.closest(".info").querySelector(".info h1").textContent} `);
        console.log("hello");
        nameInput.value = "";
        nameInputValue = "";
        currentRating = -1;
        isRated = true;

        submitRatingBTN.disabled = true;
        submitRatingBTN.style.pointerEvents = "none";
    });     
}

if(movieRatingStar) {
    movieRatingStar.forEach((star, index) => {
        star.addEventListener("mouseover", () => {
            movieRatingStar.forEach((s, i) => {
                s.style.color = i <= index ?  "#eaea1a" : "white";
            });
        })

        star.addEventListener("click", () => {
            isRated = true;
            currentRating = index;
            movieRatingStar.forEach((s, i) => {
                s.style.color = i <= index ? "gold" : "white";
            })
        })
        star.addEventListener("mouseout", () => {
            movieRatingStar.forEach((s, i) => {
                if(isRated) {
                    s.style.color = i <= currentRating ? "gold" : "white";
                }
                else {
                    s.style.color = "white";
                }
            })
        })
    })
}

async function deleteMovie(currMovie) {
    const data = {
        currMovie: currMovie,
    }
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
    }
    const response = await axios.post(`${API_URL}/delete`, data, options);
    return response
}

if(deleteBtn) {
    deleteBtn.addEventListener("click", async (e) => {
        const info = await deleteBtn.closest(".info");
        // console.log(info);
        let isDelete = confirm(`Do you want to delete this movie ${info.querySelector(".info h1").textContent}`);
        if(isDelete) {
            let data = await deleteMovie(deleteBtn.dataset.id);
            if(data.data._id == deleteBtn.dataset.id) {
                window.location.href = `${API_URL}/`
            }
        }
        else {
            return;
        }
    })
}

async function rateMovie(mID, mRating, userN) {
    const data = {
        movieID : mID,
        movieRating : mRating,
        userName: userN,
    }
    const options = {
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded'
        }
    }
    await axios.post(`${API_URL}/rateMovie`, data, options)
}

async function addComment(uN, uC, mID) {
    const data = {
        uName: uN ,
        uComment : uC,
        movieID : mID,
    }

    const options = {
        headers: {
            'Content-type' : 'application/x-www-form-urlencoded'
        }
    }

    axios.post(`${API_URL}/comment`, data, options).then((res) => {
        console.log(res.data);
        window.location.reload();
    }).catch((err) => {
        console.log(err);
    })
}


if(postBtn) {
    postBtn.disabled = true;
    postBtn.style.pointerEvents = "none";
    
    function validate() {
        const isNameValid = uCName.value.trim().length > 0;
        const isCommentValid = uCInput.value.trim().length > 0;
        const isValid = isNameValid && isCommentValid;
        postBtn.disabled = !isValid;
        postBtn.style.pointerEvents = isValid ? "auto" : "none";
    }

    uCName.addEventListener("input", validate);
    uCInput.addEventListener("input", validate);

    postBtn.addEventListener("click", async () => {
        if (postBtn.disabled) return;
        await addComment(
            uCName.value.trim(),
            uCInput.value.trim(),
            window.location.pathname.split("/")[2]
        );
        uCName.value = "";
        uCInput.value = "";        
        postBtn.disabled = true;
        postBtn.style.pointerEvents = "none";
    });
}

if(pages) {
    let pageNo = window.location.search.split("=")[window.location.search.split("=").length-1];
    if(pageNo.length == 0) {
        pageNo = 1; 
    }
    pages.forEach(page => {
        if(pageNo == page.dataset.pno) {
            page.classList.add("active");
        }
        else {
            page.classList.remove("active");
        }
    })
}