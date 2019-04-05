
"use strict";

function send(payload) {
    var req = new XMLHttpRequest();

    if (window.location.hostname.indexOf('www') == -1) {
        req.open('POST', 'https://mmalxn9h54.execute-api.eu-west-2.amazonaws.com/default/test_lambda');
    } else {
        req.open('POST', 'https://mmalxn9h54.execute-api.eu-west-2.amazonaws.com/default/enrol-www');
    }

    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("Success");
        } else {
            console.log(req.response);
        }
    };

    console.log("sending " + JSON.stringify(payload));
    req.send(JSON.stringify(payload));
}

async function reqEmail() {
    await Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4']
    }).queue([{
        title: 'Parent\'s Full Name',
        input: 'text',
        inputPlaceholder: 'Enter parent\'s full name',
        inputValidator: function inputValidator(value) {
            return !value && 'Contact name is required';
        }
    }, {
        title: 'Parent\'s Contact email',
        input: 'email',
        inputPlaceholder: 'Enter parent\'s email address'
    }, {
        title: 'Student\'s Full Name',
        input: 'text',
        inputPlaceholder: 'Enter student\'s full name',
        inputValidator: function inputValidator(value) {
            return !value && 'Student name is required';
        }
    }, {
        title: 'The student is in...',
        input: 'select',
        inputOptions: {
            'primary': 'Upper-Primary school',
            'secondary': 'Secondary School ',
            'other': 'Other'
        },
        inputPlaceholder: 'Select Age Group',
        inputValidator: function inputValidator(value) {
            if (value == 'primary' || value == 'secondary') {
                return false && 'Success';
            } else if (value == 'other') {
                return true && 'Students should be in Primary or Secondary School';
            } else {
                return true && 'Select a value from the drop-down';
            }
        }
    }]).then(function(result) {
        if (result.value) {
            var obj = {
                parent: result.value[0],
                email: result.value[1],
                student: result.value[2],
                group: result.value[3]
            };
            Swal.fire({
                title: 'Thank You!',
                type: 'success',
                text: 'We will contact you at ' + obj.email,
                confirmButtonText: 'See you soon!'
            });
            send(obj);
        }
    });
}