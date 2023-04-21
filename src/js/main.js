const form = document.querySelector('.form-container');
const indexConatiner = document.querySelector('.index-conatiner');
const outerContainer = document.querySelector('.outer-container');

// fetching floor and lift values and validating them
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const floor = document.getElementById('floor').value;
    const lift = document.getElementById('lift').value;
    const screenWidth = screen.availWidth;
    if(floor < 2 || lift < 1){
        alert('Please enter min floors 2 and min lifts 1')
    }else if(floor > 5 || lift > 4) {
        alert('Please enter floors < 6 and lifts < 5');
    }else if(lift > floor) {
        alert("Please enter lifts count <= floors count");
    }else if(screenWidth < 600 && lift > 2){
        alert("This screen size cant have more than 2 lifts");
    }
    else{
        indexConatiner.style.display = 'none';
        outerContainer.style.display = 'flex';
        generateLiftsAndFloors(floor,lift);
        floorClickEvent();
    }   
})

// generating lifts and floors
function generateLiftsAndFloors(floor,lift){
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

        textBtn.append(par,upBtn,downBtn);
        floorContainer.append(textBtn);
        // to position lifts at floor 1 initially
        if(i === 1){
            floorContainer.append(liftsContainer);
        }

        floorsliftsContainer.append(floorContainer);
    }
}

function floorClickEvent(){
    let previouslyCalledFloor;

    // to get floor no we have to go
    document.addEventListener("click", (e) => {
        const floorNo = Number(e.target.dataset.floor);
        if(floorNo !== previouslyCalledFloor){
            previouslyCalledFloor = floorNo
            liftSimulation(floorNo);
        }else{
            const lift = document.querySelector(`.lifts[data-floor="${floorNo}"`)
            liftMovement(lift,0,floorNo);
        }
    })
}

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

// function of going back to input section
const back = document.querySelector('a');
back.addEventListener('click',()=>{
    document.getElementById('floor').value = "";
    document.getElementById('lift').value = "";
    indexConatiner.style.display = 'flex';
    outerContainer.style.display = 'none';
})