$(document).ready(function () {
    var url = 'http://localhost:8081/diary'
    var imageURL = 'http://localhost:8081/static/'
    var home = 'index.html';
    let href = window.location.href;



    if (!href.includes(home)) {
        console.log(false)
        $.ajax({
            type: 'GET',
            url: url + '/all'
        })
            .done(function (response) {
                console.log(response.data, 'the data')
                response.data.forEach(element => {
                    let date = new Date(Date.parse(element.createdAt))
                    templateString = ` <div class="posted media border p-3"  id='${element._id}'><img src="assets/note.png" alt="John Doe" class="mr-3 mt-3 "> 
                     <div class="media-body"> <h4>John Doe <small><i>Posted on ${date.toUTCString()}</i></small></h4><h5>${element.title}</h5> 
                     <img src=${imageURL}${element.img} alt='image'  class='center'>
                     <p>${element.body}</p> <br></div>  <button class="btn btn-primary btnView d-flex-inline" type="button" > View</button>  </div>`
                    $(templateString).appendTo('.content');
                    $('#newEntry').modal('hide');
                });
            })
            .fail(function (msg) {
                if (msg == undefined) {
                    console.log('no entries')
                } else {
                    alert(msg)
                }
            })

    } else {
        console.log(true)
        $.ajax({
            type: 'GET',
            url: url + '/latest'
        })
            .done(function (response) {
                console.log(response.data.length)
               if(response.data.length >= 1){
                   console.log(true)
                response.data.forEach(element => {
                    let date = new Date(Date.parse(element.createdAt))
                    templateString = ` <div class="media border p-3" id='${element._id}'><img src="assets/note.png" alt="John Doe" class="mr-3 mt-3 "> 
                     <div class="media-body"> <h4>John Doe <small><i>Posted on ${date.toUTCString()}</i></small></h4><h5>${element.title}</h5> 
                     <p>${element.body}</p> <br></div> <div class="d-flex" > <button class="btn btn-primary btnView" type="button" > View</button> </div> </div>`
                    $(templateString).appendTo('.content');
                    $('#newEntry').modal('hide');
                });
               }else{
                   console.log(false)
                let result = `<h1 class='text-center mt-3' id='status'>No Entry Yet</h1>`
                $(result).appendTo('.content');
                $('#newEntry').modal('hide');
               }
            })
            .fail(function (msg) {
                if (msg == undefined) {
                    console.log('no entries')
                } else {
                    alert(msg)
                }
            })

    }



    $('#btnAdd').click(function (e) {
        e.preventDefault()
        let title = $('#title').val();
        console.log(title)
        let body = $('#body').val();
        let fd = new FormData();
        var files = $('#uploadFile')[0].files[0];
        console.log(files)
        var templateString;
        if (files != undefined) {
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
                console.log(response)
                response = response.data
                let date = new Date(Date.parse(response.createdAt))
                templateString = ` <div class="media border p-3"><img src="assets/note.png" alt="John Doe" class="mr-3 mt-3 "> 
                    <div class="media-body"> <h4>John Doe <small><i>Posted on ${date.toUTCString()}</i></small></h4><h5>${response.title}</h5> 
                    <p>${response.body}</p> <br>
                    <div class="d-flex" > <button class="btn btn-primary" type="button"> View</button> </div></div> </div>`
                $('.content .media').last().remove();
                $(templateString).prependTo('.content');
                $('#title').val('');
                $('#body').val('');
                $('#uploadFile')[0].files[0] = null;
                $('#status').hide()
                $('#newEntry').modal('hide');

            })
            .fail(function (response) {
                alert(response)
            })


    });

    $(document).on('click', '.btnView', function () {
         alert('clicked');
        if(  $( ".posted" ).hasClass( "viewed" )){
            $('.posted').removeClass('viewed')
            $(this).parent().addClass("viewed");
        }
        else{
            $(this).parent().addClass("viewed");
        }
         
        
    });


 




});