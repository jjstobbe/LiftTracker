import $ from 'jquery';

export default {
  login(username, password, location="/home") {
      var dataObject = JSON.stringify({username: username, password: password}); 
      $.ajax({
        type: "POST",
        url: "https://baas.kinvey.com/user/kid_BJFBIVmX-/login",
        data: dataObject,
        headers: {
          "Authorization": "Basic " + btoa(username+":"+password),
          "Content-Type": "application/json"
        },success: function(data){
          document.cookie = "authToken="+data._kmd.authtoken;
          window.location.href = location;
        },error: function(data){
          console.error(data);
          window.location.href = "/login"
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
      "Authorization": 'Kinvey ' + document.cookie.substring(document.cookie.indexOf('=')+1),
      "X-Kinvey-API-Version": '3',
    }, error: function(data) {
      console.error(data);
      window.location.href = "/login"
    }
  });
}
