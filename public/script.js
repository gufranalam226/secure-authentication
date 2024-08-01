const existingUser = document.querySelector(".registration");
const loginUser = document.querySelector(".login");


const exUser=()=>{
    existingUser.style.display = "none";
    loginUser.style.display = "flex"
}

const newUser=()=>{
    existingUser.style.display = "flex";
    loginUser.style.display = "none"
}