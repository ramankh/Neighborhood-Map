/*! Neighborhood-Map2015-12-30 Author: Raman Khenanisho*/
var model={getData:function(){return localStorage&&localStorage.getItem("locations")?JSON.parse(localStorage.getItem("locations")):(localStorage.setItem("locations",JSON.stringify(model.locations)),model.locations)},locations:[{lat:37.338052,lng:-121.901239,name:"SAP Center",location:{address:"525 W Santa Clara St",city:"San Jose",state:"CA",zip:"95113"}},{lat:37.396869,lng:-121.802276,name:"Alum Rock Park",location:{address:"15350 Penitencia Creek Rd",city:"San Jose",state:"CA",zip:"95127"}},{lat:37.327364,lng:-121.858972,name:"Happy Hollow Park",location:{address:"1300 Senter Rd",city:"San Jose",state:"CA",zip:"95112"}},{lat:37.240468,lng:-121.873784,name:"Almaden Lake Park",location:{address:"15652 Almaden Expy",city:"San Jose",state:"CA",zip:"95120"}},{lat:37.403154,lng:-121.969836,name:"Levi's Stadium",location:{address:"4900 Marie P DeBartolo Way",city:"Santa Clara",state:"CA",zip:"95054"}},{lat:37.319969,lng:-121.858696,name:"San Jose History Park",location:{address:" 1650 Senter Rd",city:"San Jose",state:"CA",zip:"95112"}}]};