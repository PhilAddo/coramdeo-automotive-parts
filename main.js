let userDataArray = [

];

let productsDataArray = [
    {
        categoryName: "Engine & Powertrain",
        categoryImg: "def-img.png",
        availableParts: [
            {
                partImg: "engine-blk-img.webp",
                partName: "Engine block",
                partPrice: 6000.00,
                partQuantity: 100
            },
            {
                partImg: "cylinder-head.webp",
                partName: "Cylinder head",
                partPrice: 3000.00,
                partQuantity: 100
            },
            {
                partImg: "pistons.jpeg",
                partName: "Pistons",
                partPrice: 3000.00,
                partQuantity: 100
            }
        ]
    },
    {
        categoryName: "Electrical & Electronics",
        categoryImg: "def-img.png",
        availableParts: [
            {
                partImg: "battery.png",
                partName: "Battery",
                partPrice: 1000.00,
                partQuantity: 100
            },
            {
                partImg: "alternator.webp",
                partName: "Alternator",
                partPrice: 600.00,
                partQuantity: 100
            },
            {
                partImg: "spark-plugs.webp",
                partName: "Spark plugs",
                partPrice: 500.00,
                partQuantity: 100
            }
        ]
    },
    {
        categoryName: "Braking System",
        categoryImg: "def-img.png",
        availableParts: [
            {
                partImg: "brake-pads.webp",
                partName: "Brake pads",
                partPrice: 800.00,
                partQuantity: 100
            },
            {
                partImg: "brake-disks.webp",
                partName: "Brake discs",
                partPrice: 700.00,
                partQuantity: 100
            },
            {
                partImg: "abs-module.png",
                partName: "ABS module",
                partPrice: 1000.00,
                partQuantity: 100
            }
        ]
    },
    {
        categoryName: "Others",
        categoryImg: "def-img.png",
        availableParts: [
            {
                partImg: "tires.jpg",
                partName: "Tires",
                partPrice: 800.00,
                partQuantity: 100
            },
            {
                partImg: "rims.webp",
                partName: "Rims",
                partPrice: 700.00,
                partQuantity: 100
            },
            {
                partImg: "wipers.jpg",
                partName: "Wipers",
                partPrice: 300.00,
                partQuantity: 100
            }
        ]
    }
];

let cartDataArray = [

];

class UserObj {
    constructor(firstName, lastName, dateOfBirth, residentialAddress, phoneNumber, emailAddress, password,cart){
        this.firstName = firstName,
        this.lastName = lastName,
        this.dateOfBirth = dateOfBirth,
        this.residentialAddress = residentialAddress,
        this.phoneNumber = phoneNumber,
        this.emailAddress = emailAddress,
        this.password = password,
        this.cart = cart
    }
}

//switches the window to the passed page
function goToPage(pageName){
      window.location.href = pageName;
    }

//registers a user
function register(event){
    event.preventDefault();
    let firstNameInput = document.getElementById("first-name-input").value;
    let lastNameInput = document.getElementById("last-name-input").value;
    let dateOfBirthInput = document.getElementById("date-of-birth-input").value;
    let residentialAddressInput = document.getElementById("residential-address-input").value;
    let phoneNumberInput = document.getElementById("phone-number-input").value;
    let emailAddressInput = document.getElementById("email-address-input").value;
    let passwordInput1 = document.getElementById("password-input1").value;
    let passwordInput2 = document.getElementById("password-input2").value;

    //checks if the chosen email address is already registered
    for(i = 0; i < userDataArray.length; i++){
        if(userDataArray[i].emailAddress == emailAddressInput){
            alert("This email address is already registered.\nPlease choose a different email address.");
            return;
        }
    }

    if(passwordInput1 !== passwordInput2){
        alert("The enetred passwords do not match.\nPlease check and try again.");
        return;
    }

    let userObj = new UserObj(firstNameInput, lastNameInput,dateOfBirthInput, residentialAddressInput, phoneNumberInput
        ,emailAddressInput,passwordInput1, []
    );
    userDataArray.push(userObj);
    saveUserDataArray();
    alert("Registration successful!\nPlease log in with your email and password.");
    switchContainer("login-container");
}

//logs in a user
function logIn(event){
    event.preventDefault();
    let userEmail = document.getElementById("user-email").value;
    let userPassword = document.getElementById("user-password").value;
    let uesrFound = false;
    for(i = 0; i < userDataArray.length; i++){
        if(userDataArray[i].emailAddress == userEmail && userDataArray[i].password == userPassword){
            uesrFound = true;
            sessionStorage.setItem("activeUserIndex", i);
            window.location.href = "index.html";
            break;
        }
    }
    if(uesrFound === false){
        alert("Invalid username or password.\nIf this is your first time here, kindly click on 'Register' to register.")
    }
}

//clears the activeUserIndex value from session storage and refreshes the page
function signOut(){
    sessionStorage.removeItem("activeUserIndex");
    location.reload();
}

//saves the user data array to local storage
function saveUserDataArray(){
    let stringUserDataArray = JSON.stringify(userDataArray);
  localStorage.setItem("userDataArray", stringUserDataArray);
  loadUserDataArray();
}

//loads the user data array from local storage
function loadUserDataArray(){
    let storedUserDataArray = JSON.parse(
    localStorage.getItem("userDataArray")
  );
  if (storedUserDataArray !== null) {
    userDataArray = storedUserDataArray;
  }
}

window.onload = loadUserDataArray();
//sessionStorage.clear();