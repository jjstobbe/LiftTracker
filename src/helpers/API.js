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
          }
        });
    },
    getAllExercises() {
        // Bug with multiple cookies existing..
        return $.ajax({
          type: 'GET',
          url: 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Exercises',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          headers: {
            "Authorization": 'Kinvey ' + document.cookie.substring(document.cookie.indexOf('=')+1),
            "X-Kinvey-API-Version": '3',
          }
        });
    }
}
