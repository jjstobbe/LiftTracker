import $ from 'jquery';

export default {
  login(username, password, location="/Exercise") {
      var dataObject = JSON.stringify({username: username, password: password}); 
      $.ajax({
        type: "POST",
        url: "https://baas.kinvey.com/user/kid_BJFBIVmX-/login",
        data: dataObject,
        headers: {
          "Authorization": "Basic " + btoa(username+":"+password),
          "Content-Type": "application/json"
        },success: function(data){
          document.cookie = "jjstobbe_Auth="+data._kmd.authtoken;
          window.location.href = location;
        },error: function(data){
          console.error(data);
        }
      });
  },
  getAllExercises() {
    return call('GET', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Exercises', null);
  },
  postExercise(data) {
    var dataObject = JSON.stringify(data); 
    return call('POST','https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Exercises', dataObject);
  },
  updateExercise(data) {
    var dataObject = JSON.stringify(data);
    return call('PUT','https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Exercises/'+data.id, dataObject);
  },
  getAllWeight(){
    return call('GET', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Weight', null);
  },
  postWeight(data){
    var dataObject = JSON.stringify(data); 
    return call('POST','https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Weight', dataObject);
  },
  deleteWeight(data){
    console.log(data);
    return call('DELETE','https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Weight/'+data._id, null);
  },
  isAuthenticated(){
    return document.cookie.indexOf('jjstobbe_Auth=') !== -1;
  }
}

function call(type, url, data) {
  return $.ajax({
    type: type,
    url: url,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: data,
    headers: {
      "Authorization": 'Kinvey ' + getCookie('jjstobbe_Auth'),
      "X-Kinvey-API-Version": '3',
    }, error: function(data) {
      console.error(data);
    }
  });
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
