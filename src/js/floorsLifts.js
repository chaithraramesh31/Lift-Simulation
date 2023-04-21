// fetching floor and lift values
const urlParams = new URLSearchParams(window.location.search);
const floor = urlParams.get('floor');
const lift = urlParams.get('lift');

// generating lifts
const liftsContainer = document.createElement('div');
liftsContainer.className = 'lifts-container';
for(let i=0; i<lift; i++){

    const lifts = document.createElement('div');
    lifts.className = 'lifts';
    lifts.dataset.floor = `${1}`;

    const leftDoor = document.createElement('div');
    leftDoor.className = 'left-door';

    const rightDoor = document.createElement('div');
    rightDoor.className = 'right-door';

    lifts.append(leftDoor,rightDoor);
    liftsContainer.append(lifts);
}

// generating floors
const floorsliftsContainer = document.querySelector('.floorslifts-container');
for( let i=floor; i>0; i--){

    const floorContainer = document.createElement('div');
    floorContainer.className = 'floor-container';

    const textBtn = document.createElement('div');
    textBtn.className = 'text-btn';

    const par = document.createElement('p');
    par.textContent = `Floor ${i}`;

    const upBtn = document.createElement('button');
    upBtn.className = 'upBtn';
    upBtn.textContent = 'Up';
    upBtn.dataset.floor = `${i}`;

    const downBtn = document.createElement('button');
    downBtn.className = 'downBtn';
    downBtn.textContent = 'Down';
    downBtn.dataset.floor = `${i}`;

    const floorLine = document.createElement('span');
    floorLine.className = 'floor-line'

    textBtn.append(par,upBtn,downBtn);
    floorContainer.append(textBtn,floorLine);
    // to position lifts at floor 1 initially
    if(i === 1){
        floorContainer.append(liftsContainer);
    }

    floorsliftsContainer.append(floorContainer);
}

// to get floor no we have to go
document.addEventListener("click", (e) => {
    const floorNo = Number(e.target.dataset.floor);
    liftSimulation(floorNo);
})

// to get non busy lifts list and initialize lift movement
function liftSimulation(floorNo){
    const liftsList = Array.from(document.querySelectorAll('.lifts'));
    const nonBusyLifts = liftsList.filter((lift)=> !lift.classList.contains('busy'))
    if(nonBusyLifts.length){
        const {closestLift,distance} = getClosestLift(floorNo,nonBusyLifts);
        liftMovement(closestLift,distance,floorNo);
    }else{
        setTimeout(()=>{
            liftSimulation(floorNo);
        },1000)
    }
}

// get closest lift to the floor no
function getClosestLift(floorNo,nonBusyLifts){
    let distance = null;
    let closestLift = null;
    for(let lift of nonBusyLifts){      
        const floorDistance = Math.abs(floorNo - lift.dataset.floor);
        if(floorDistance < distance || distance === null){
            distance = floorDistance;
            closestLift = lift;           
        }
    }
    return {
        closestLift,
        distance
    };
}

//movement of lift to floor no
function liftMovement(lift,distance,floorNo){
    lift.style.transform = `translateY(${-110 * (floorNo - 1)}px)`; 
    lift.style.transition = `all ${distance * 2}s ease`;
    lift.dataset.floor = floorNo;
    lift.classList.add('busy');
    setTimeout(() => {
        doorOperation(lift);                 
    }, distance * 2000);  
}

// lift doors open and close operation
function doorOperation(lift){
    const leftDoor = lift.querySelector('.left-door');
    const rightDoor = lift.querySelector('.right-door');
    leftDoor.classList.add('door-operation');
    rightDoor.classList.add('door-operation');
    setTimeout(()=>{
        leftDoor.classList.remove('door-operation');
        rightDoor.classList.remove('door-operation');
        lift.classList.remove('busy');
    },3000)
}