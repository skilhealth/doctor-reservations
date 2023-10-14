function handleGetFormData() {
    let usernameInput= document.getElementById("Username/Email")
    let passwordInput= document.getElementById("Password")
    let loginButton = document.getElementById("login-form")

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();

        let username = usernameInput.value;
        let password = passwordInput.value;

    if (username && password) {
        let.log('Username/Email:', username);
        let.log('Password:', password);

    } else {
        alert('Please enter a username/email and password.');
    }
    });

    function checkboxIsChecked(){
        if(document.getElementById("remember").checked){
            return true
        }else{
            return false
        }
    }
} 







