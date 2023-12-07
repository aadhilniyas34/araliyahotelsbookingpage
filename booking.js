//Variables for booking Price
const singleRoomPrice = 25000;
const doubleRoomPrice = 35000;
const tripleRoomPrice = 40000;
const extraBedPrice = 8000;
const extraMealPrice = 5000;
const localAdultPrice = 5000;
const localKidPrice = 2000;
const foreignAdultPrice = 10000;
const foreignKidPrice = 5000;
const guideAdultPrice = 1000;
const guideKidPrice = 500;
const promoCodes = ['123']


let numOfSingleRooms = 0;
let numOfDoubleRooms = 0;
let numOfTripleRooms = 0;

let numOfAdults = 0;
let numOfKids = 0;
let numOfBeds = 0;
let numOfMeals = 0;

let numOfRooms = 0;
let pointsPerRoom = 20;

// Variables for Hotel Booking
const formRoomBooking = document.querySelectorAll('#bookingRoomForm input');
const checkInDate =  document.getElementById('InDate');
const checkOutDate = document.getElementById("OutDate");
const getName = document.getElementById('name');
const getMobile = document.getElementById('mobile');
const getEmail = document.getElementById('email');
const roomSingle = document.getElementById("singleNumRooms");
const roomDouble = document.getElementById("doubleNumRooms");
const roomTriple = document.getElementById("tripleNumRooms");
const adults = document.getElementById("adults");
const kids = document.getElementById("kids");
const extraBed = document.getElementById("extraBed");
const extraMeals = document.getElementById("meals");
// Variables for extra requirements in Hotel Booking
let wifiBox = document.getElementById('wifi');
let poolViewBox = document.getElementById('poolView');
let gardenViewBox = document.getElementById('gardenView');
// current Hotel Booking - Live update
const currentHotelSummaryTable = document.getElementById('summaryCurrentHotelTable');
let costHotelCurrent = document.getElementById('currentHotelCost');
// overall cost update 
const overallHotelTableBook = document.getElementById('overallHotelBookingTable');
let overallHotelCost = document.getElementById('overallCostHotel');
//variables for Promo Code function
const promoCodeOffer = document.getElementById("promoCode");
// Book Now Button
const btnBookNow = document.getElementById("bookBtn");



// Variables for Adventure Booking
const formAdventureBooking = document.querySelectorAll('#bookingAdventureForm input');
const dateBook = document.getElementById('bookDate');
const numLocalAdult = document.getElementById("numLocalAdult");
const hoursLocalAdult = document.getElementById("hoursLocalAdult");
const numLocalKid = document.getElementById("numLocalKid");
const numForeignAdult = document.getElementById("numForeignAdult");
const numForeignKid  = document.getElementById("numForeignKid");
const adultGuide = document.getElementById('guideAdult');
const kidGuide = document.getElementById('guideKid');
//current Adventure Booking - Live update
const currentAdventureSummaryTable = document.getElementById('summaryCurrentAdventureTable');
let costAdventureCurrent = document.getElementById('currentAdventureCost');
const textAdventure = document.getElementById('overallAdventureBookingText');


// Total Cost current - Live update
let costTotalCurrent = document.getElementById('currentTotalCost');



// Date - Days Count
let startDate, endDate = new Date()
let totalDays = 0;

checkInDate.addEventListener('change', e => {
  startDate = new Date(e.target.value)
  console.log(e.target.value)
})

checkOutDate.addEventListener('change', e => {
  endDate = new Date(e.target.value)

  console.log(e.target.value)

   totalDays = Math.floor((endDate.getTime()-startDate.getTime() ) / (1000 * 60 * 60 * 24));

})


// Booking Calculations - Current Booking
function currentCost () {

// Hotel Current Cost
let currentHotelCost = 
                    (totalDays *((roomSingle.value * singleRoomPrice)+
                    (roomDouble.value * doubleRoomPrice) +
                    (roomTriple.value * tripleRoomPrice) +
                    (extraBed.value* extraBedPrice) +
                    (extraMeals.value * extraMealPrice))) ;


  costHotelCurrent.textContent = `Current Hotel Booking Cost : ${currentHotelCost.toFixed(2)} LKR `;

// Adventure Current Cost                      
let currentAdventureCost = ((numLocalAdult.value * hoursLocalAdult.value * localAdultPrice) + 
                        (numLocalKid.value * localKidPrice) +
                        (numForeignAdult.value * foreignAdultPrice) +
                        (numForeignKid.value * foreignKidPrice) ) ; 

                        if (adultGuide.checked) {
                          currentAdventureCost+=+numLocalAdult.value * 1000 ;
                          currentAdventureCost+=+numForeignAdult.value * 1000;
                        }
                        if (kidGuide.checked) {
                          currentAdventureCost+=+numLocalKid.value * 500;
                          currentAdventureCost+=+numForeignKid.value * 500;
                        }

                   
   costAdventureCurrent.textContent = `Current Adventure Booking Cost : ${currentAdventureCost.toFixed(2)} LKR `;


//Total Current Cost
let totalCurrent = currentHotelCost + currentAdventureCost;


      costTotalCurrent.textContent =  `Current Total Booking Cost :
                                    ${totalCurrent.toFixed(2)} LKR `; 

}   


// Overall Hotel Booking - Calculations with discunt
function overallTotalCostHotel (isPromoApplied) {
  let overallCostHotel = 
                      ((totalDays *(roomSingle.value * singleRoomPrice)+
                      (roomDouble.value * doubleRoomPrice) +
                      (roomTriple.value * tripleRoomPrice) +
                      (extraBed.value* extraBedPrice) +
                      (extraMeals.value * extraMealPrice))) ;
  

                        if (isPromoApplied) {
                          overallCostHotel -= overallCostHotel*0.05;
                        }  
        
      overallHotelCost.textContent = `Overall Booking Cost :
      ${overallCostHotel.toFixed(2)} LKR `
  } 


//Overall Adventure Booking - Calculation
function overallTotalCostAdventure () {
  let overallCostAdventure = ((numLocalAdult.value * hoursLocalAdult.value * localAdultPrice) + 
                              (numLocalKid.value * localKidPrice) +
                              (numForeignAdult.value * foreignAdultPrice) +
                              (numForeignKid.value * foreignKidPrice) )  

                                  if (adultGuide.checked) {
                                    currentAdventureCost+=+numLocalAdult.value * 1000 ;
                                    currentAdventureCost+=+numForeignAdult.value * 1000;
                                  }
                                  if (kidGuide.checked) {
                                    currentAdventureCost+=+numLocalKid.value * 500;
                                    currentAdventureCost+=+numForeignKid.value * 500;
                                  } ;

          textAdventure.textContent = `Overall Adventure Booking Cost :
          ${overallCostAdventure.toFixed(2)} LKR `;
  } 
  

// Hotel Booking Current Update - Hotel Booking Live
formRoomBooking.forEach(input => input.addEventListener('input', currentHotelBooking));
function currentHotelBooking() {
currentCost();
currentHotelSummaryTable.innerHTML = `
                            <tr>
                              <th>Category</th>
                              <th> Details/ Quantity</th>
                            </tr>

                            <tr>
                              <td> Name </td>
                              <td>${getName.value}</td>
                            </tr>

                            <tr>
                              <td> Mobile Number </td>
                              <td>${getMobile.value}</td>
                            </tr>

                            <tr>
                              <td> Email </td>
                              <td>${getEmail.value}</td>
                            </tr>

                            <tr>
                              <td> Check In Date </td>
                              <td>${checkInDate.value}</td>
                            </tr>

                            <tr>
                              <td> Check Out Date </td>
                              <td>${checkOutDate.value}</td>
                            </tr>

                            <tr>
                              <td> Adults </td>
                              <td>${adults.value}</td>
                            </tr>

                            <tr>
                              <td>Kids</td>
                              <td>${kids.value}</td>
                            </tr>

                            <tr>
                              <td> Single Rooms </td>
                              <td>${roomSingle.value}</td>
                            </tr>

                            <tr>
                              <td> Double Rooms </td>
                              <td>${roomDouble.value}</td>
                            </tr>

                            <tr>
                              <td> Triple Rooms </td>
                              <td>${roomTriple.value} </td>
                            </tr>

                            <tr>
                              <td> Extra Beds </td>
                              <td>${extraBed.value} </td>
                            </tr>

                            <tr>
                              <td> Meals </td>
                              <td>${extraMeals.value} </td>
                            </tr>

                            <tr>
                              <td>Wi-Fi </td>
                              <td>${wifiBox.checked ? 'Yes' : 'No'}</td>
                            </tr>

                            <tr>
                              <td>Pool View </td>
                              <td>${poolViewBox.checked ? 'Yes' : 'No'}</td>
                            </tr>

                            <tr>
                              <td>Garden View </td>
                              <td>${gardenViewBox.checked ? 'Yes' : 'No'}</td>
                            </tr>

               `;
        }


formAdventureBooking.forEach(input => input.addEventListener('input', currentAdventureBooking));
function currentAdventureBooking () {
currentCost();
currentAdventureSummaryTable.innerHTML = `
                                    <tr>
                                      <th> Category </th>
                                      <th>  Details/Quantity</th>
                                    </tr>

                                    <tr>
                                        <td> Local Adult </td>
                                        <td>${dateBook.value}</td>
                                    </tr>
        
                                    <tr>
                                        <td> Local Adult </td>
                                        <td>${numLocalAdult.value}</td>
                                    </tr>
        
                                    <tr>
                                        <td> Hours (Local Adult) </td>
                                        <td>${hoursLocalAdult.value}</td>
                                    </tr>
                            
                                    <tr>
                                        <td> Local Kid </td>
                                        <td>${numLocalKid.value}</td>
                                    </tr>
                            
                                    <tr>
                                        <td> Foreign Adult </td>
                                        <td>${numForeignAdult.value}</td>
                                    </tr>
                            
                                    <tr>
                                        <td> Foreign Kid </td>
                                        <td>${numForeignKid.value}</td>
                                    </tr> 
        
                                    <tr>
                                        <td> Guide for Adult </td>
                                        <td>${adultGuide.checked  ? 'Yes' : 'No'}</td>
                                    </tr>
        
                                    <tr>
                                        <td> Guide for Kid </td>
                                        <td>${kidGuide.checked  ? 'Yes' : 'No'}</td>
                                    </tr>
                       `;
            
        }

                                           
// Hotel Booking Overall - Book Now Button Click
const BookNow = (e) => {
e.preventDefault()
let isPromoApplied = false;
const promoCode = promoCodeOffer.value;
isPromoApplied = promoCodes.some(i=> i === promoCode);
overallTotalCostHotel(isPromoApplied);
overallHotelTableBook.innerHTML = `
                            <tr>
                              <th>Category</th>
                              <th> Details/ Quantity</th>
                            </tr>

                            <tr>
                              <td> Name </td>
                              <td>${getName.value}</td>
                            </tr>

                            <tr>
                              <td> Mobile Number </td>
                              <td>${getMobile.value}</td>
                            </tr>

                            <tr>
                              <td> Email </td>
                              <td>${getEmail.value}</td>
                            </tr>

                            <tr>
                            <td> Check In Date </td>
                            <td>${checkInDate.value}</td>
                          </tr>

                          <tr>
                            <td> Check Out Date </td>
                            <td>${checkOutDate.value}</td>
                          </tr>

                            <tr>
                              <td> Adults </td>
                              <td>${adults.value}</td>
                            </tr>

                            <tr>
                              <td>Kids</td>
                              <td>${kids.value}</td>
                            </tr>

                            <tr>
                              <td> Single Rooms </td>
                              <td>${roomSingle.value} </td>
                            </tr>

                            <tr>
                              <td> Double Rooms </td>
                              <td>${roomDouble.value} </td>
                            </tr>

                            <tr>
                              <td> Triple Rooms </td>
                              <td>${roomTriple.value} </td>
                            </tr>

                            <tr>
                              <td> Extra Beds </td>
                              <td>${extraBed.value} </td>
                            </tr>

                            <tr>
                              <td> Meals </td>
                              <td>${extraMeals.value} </td>
                            </tr>

                            <tr>
                              <td>Wi-Fi </td>
                              <td>${wifiBox.checked ? 'Yes' : 'No'}</td>
                            </tr>

                            <tr>
                              <td>Pool View </td>
                              <td>${poolViewBox.checked ? 'Yes' : 'No'}</td>
                            </tr>

                            <tr>
                              <td>Garden View </td>
                              <td>${gardenViewBox.checked ? 'Yes' : 'No'}</td>
                            </tr> 
               `;

        document.getElementById('bookingRoomForm').reset();
        document.getElementById("summaryCurrentHotelTable").style.display = "none";
        document.getElementById("currentHotelCost").innerText = "Current Hotel Booking Cost : 0";
        document.getElementById('currentTotalCost').innerHTML = "Current Total Booking Cost : 0 LKR";

        if (checkInDate === "" || checkOutDate === "" || getName === "" || getMobile === "" || getEmail === "" ) {
                alert("Please fill in all required fields.")
                document.getElementById("overallHotelBookingTable").style.display = "none"
                document.getElementById("overallCostHotel").innerText = "Current Hotel Booking Cost : 0 LKR";
        } else {
              
        }

        
    }

// Book Now Button
btnBookNow.addEventListener('click', BookNow);

//Adventure Book - Button
const btnAdventure = document.getElementById('adventureBtn');
btnAdventure.addEventListener('click', bookAdventure);


function bookAdventure () {
  overallTotalCostAdventure();
  textAdventure.innerHTML+= `<br> Adventure - Diving <br>Booked Date - ${dateBook.value}  <br> Number of Local Adult - ${numLocalAdult.value}  <br>Number of Local Kid - ${numLocalKid.value}  <br> Number of Foreign Adult - ${numForeignAdult.value}  <br>Number of Foreign Kid - ${numForeignKid.value}  <br>Guide for Adult- ${adultGuide.checked}  <br>Guide for Kid - ${kidGuide.checked} <br>Thank you for booking with us. Looking forward to see you ! `
  ;
  document.getElementById('bookingRoomForm').reset();
  document.getElementById('summaryCurrentHotelTable').style.display = "none";
  document.getElementById('currentHotelCost').innerText = "Current Hotel Booking Cost : 0 LKR ";
  
  document.getElementById('currentTotalCost').innerHTML = "Current Total Booking Cost : 0 LKR"; 

  document.getElementById('overallHotelBookingTable').style.display = "none";
  document.getElementById('overallCostHotel').innerHTML = "Overall Hotel Booking Cost : 0 LKR";

  document.getElementById('bookingAdventureForm').reset();
  document.getElementById('summaryCurrentAdventureTable').style.display = "none";
  document.getElementById('currentAdventureCost').innerText = "Current Adventure Booking Cost : 0 LKR";

      if (dateBook === ""  ) {
        alert("Please fill in all required fields.")
        document.getElementById("overallAdventureBookingText").innerText = "Current Hotel Booking Cost : 0 LKR"
        document.getElementById('currentTotalCost').innerHTML = "Current Total Booking Cost : 0 LKR";
    } else {
      
    }
}

// Check loyalty - Button
const btnLoyalty = document.getElementById("loyalty");
btnLoyalty.addEventListener('click', checkLoyalty);

function checkLoyalty() {
  // Retrieve the number of rooms for each type
  let singleRooms = parseInt(document.getElementById('singleNumRooms').value) || 0;
  let doubleRooms = parseInt(document.getElementById('doubleNumRooms').value) || 0;
  let tripleRooms = parseInt(document.getElementById('tripleNumRooms').value) || 0;

  // Calculate total loyalty points
  let totalRooms = singleRooms + doubleRooms + tripleRooms;
  let loyaltyPoints = totalRooms > 3 ? totalRooms * 20 : 0;

  // Store loyalty points in local storage
  if (loyaltyPoints > 0) {
      let currentLoyaltyPoints = localStorage.getItem('loyaltyPoints') || 0;
      let updatedLoyaltyPoints = parseInt(currentLoyaltyPoints) + loyaltyPoints;
      localStorage.setItem('loyaltyPoints', updatedLoyaltyPoints);
  }

  // Display loyalty points to the user
  document.getElementById('loyaltyPointsDisplay').textContent = loyaltyPoints === 0 ? 'No Loyalty Points' : loyaltyPoints + ' points';
}



//Add to favourite - Button
const btnFav = document.getElementById('favBtn');
btnFav.addEventListener('click', addToFav);

// Local Storage Save Details - Add Fav Button Click
function addToFav() {
 // Retrieve existing favorites from local storage
 let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

 favorites.push({ 
  'Check In Date' : (checkInDate.value),
 'Check Out Date' : (checkOutDate.value),
 'Name with Initials' : (getName.value),
 'Mobile Number' : (getMobile.value),
 'Email' : (getEmail.value),
 'Number of Single Rooms' : (roomSingle.value),
 'Number of Double Rooms' : (roomDouble.value),
 'Number of Triple Rooms' : (roomTriple.value),
 'Number of Adults' : (adults.value),
 'Number of Kids' : (kids.value),
 'Number of Extra Bed' : (extraBed.value),
 'Number of Meals' : (extraMeals.value),
 'Extra Reqirement - WIFI' : (wifiBox.checked),
 'Extra Reqirement - Pool View' : (poolViewBox.checked),
 'Extra Reqirement - Garden View' : (gardenViewBox.checked),
 'Adventure ' : ('Diving'),
 'Booked Date - Adventure' : (dateBook.value),
 'Number of Adult - Adventure' : (numLocalAdult.value),
 'Hours - Local Adult - Adventure' : (hoursLocalAdult.value),
 'Number of Local Kid - Adventure' : (numLocalKid.value),
 'Number of Foreign Adult - Adventure' : (numForeignAdult.value),
 'Number of Foreign Kid - Adventure' : (numForeignKid.value),
 'Extra Requirement - Adventure Guide for Adult' : (adultGuide.checked),
 'Extra Requirement - Adventure Guide for Kid' : (kidGuide.checked)
});
 // Keep only the latest favorite (remove the oldest one)
 if (favorites.length > 1) {
     favorites.shift();
 }
 // Save the updated favorites to local storage
 localStorage.setItem('Details', JSON.stringify(favorites));

}