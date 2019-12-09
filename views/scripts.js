$(document).ready(function () {
    var url = 'http://localhost:8081/diary'

    $.ajax({
        type: 'GET',
        url: url + '/all'
    })
        .done(function (msg) {
            console.log(msg)
        })
        .fail(function (msg) {
            if (msg == undefined) {
                console.log('no entries')
            } else {
                alert(msg)
            }
        })

    $('#btnAdd').click(function (e) {
        e.preventDefault()
        let title = $('#title').val();
        console.log(title)
        let body = $('#body').val();
        let fd = new FormData();
        var files = $('#uploadFile')[0].files[0];
        var templateString;
        if (files == undefined) {
            fd.append('img', files);
            fd.append('title', title)
            fd.append('body', body)
        } else {
            fd.append('title', title)
            fd.append('body', body)
        }
        $.ajax({
            url: url + '/add',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
        })
            .done(function (response) {
                if (response.data.img == undefined) {
                    templateString = ` <div class="media border p-3"><img src="assets/note.png" alt="John Doe" class="mr-3 mt-3 "> <h4>John Doe <small><i>Posted on ${response.data.createdAt}}</i></small></h4> <p>${response.data.title}</p>  <button class="btn btn-primary" type="button"> View</button> </div> </div>`
                }
                else {
                     templateString = `<div class="card w-75" id="${response.data._id}"><div class="card-header text-center  ">${response.data.title}</div><div class="card-body"> <img src="http://localhost:8081/static/uploads/${response.data.img}" class ="center"  height="200px" width="200px"/><p>${response.data.body}</p><br><br><button class="btn btn-outline-primary btnUpdate " id="${response.data._id}">Update</button><button class="btn btn-outline-danger btnDelete" id="${response.data._id}">Delete</button></div></div> <br>`
                }
                $(templateString).prependTo('.content');
                $('#newEntry').modal('hide');
            })
            .fail(function (response) {
                alert(response.data.status)
            })


    });
       










});