function getCountries(){
  return new Promise((resolve, reject) => {
    console.log("fetching countries...");
    setTimeout(() => resolve(["India","USA","UK"]), 8000);
  });
}

function getProvinces(country){
  return new Promise((resolve, reject) => {
    console.log("fetching provinces for", country);
    setTimeout(() => resolve([{ id: 101, name: "Province-A" }]), 7000);
  });
}

function getCities(provinceId){
  return new Promise((resolve, reject) => {
    console.log("fetching cities for", provinceId);
    setTimeout(() => resolve(["City-X","City-Y"]), 6000);
  });
}


function *generator(){
    const countries=yield getCountries();
    const provinces= yield getProvinces(countries[0]);
    const cities= yield getCities(provinces[0].id);
    return cities;
}

let it =generator();
function executer(arg){
    res=it.next(arg);
    if(res.done){
        console.log(res);
    }else{
        Promise.resolve(res.value).then(executer)
    }
}
executer()