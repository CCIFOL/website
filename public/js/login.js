document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginform');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var loginformData = {
            username: username,
            password: password
        };

        fetch('https://baze.pythonanywhere.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginformData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {

                displayMessage('Login failed. Please check your credentials.');
                throw new Error('Login failed. Please check your credentials.');
                
            }
        })
        .then(data => {


            displayMessage('Login successful');
            localStorage.setItem('firstName', data.systemRank);
            localStorage.setItem('idNo', data.policeId);
            localStorage.setItem('accountStatus', data.station);
            redirectToHomepage();
            
        })
        .catch(error => {

            displayMessage(error);
        });
    });
});

var mess = document.getElementById("messag");

function displayMessage(message)
{

    $('#message').text("");
    $('#message').text(message);
}

function backtonone()
{
    mess.style.display = "none";
}

function redirectToHomepage()
{

    window.location.href = 'home.html';
}
