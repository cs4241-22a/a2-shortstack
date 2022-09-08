// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

function indivValid(data){
  if(data > 255 || data < 0){
    return false;
  }else{
    return true;
  }
}

function allValid(dt1, dt2, dt3, dt4, dt5, dt6){
 //if any individual numbers are invalid, return invalid
  if(!indivValid(dt1) || !indivValid(dt2) || !indivValid(dt3) || !indivValid(dt4) || !indivValid(dt4) || !indivValid(dt5) || !indivValid(dt6)){
    return "Invalid";
  }
  //if total is above the 510 cap, return invalid
  else if((dt1+dt2+dt3+dt4+dt5+dt6) > 510){
    return "Invalid";
  }
  //otherwise is valid
  else{
    return "Valid";
  }
}

