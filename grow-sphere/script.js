function SendMail() {
    var params = {
        from_name : document.getElementById("fullName").ariaValueMax,
        email_id : document.getElementById("email_id").ariaValueMax,
        message : document.getElementById("message").ariaValueMax
    }

    emailjs.send("service_qwxb96g", "template_w8agulo", params).then(function (res){
        alert("Success! " + res.status);
    })

}