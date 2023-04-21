const form = document.querySelector('.form-container');

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
    }else{
        const url = `floorsLifts.html?floor=${encodeURIComponent(floor)}&lift=${encodeURIComponent(lift)}`;
        window.location.href = url;
    }   
})