$(document).ready(function () {
    var url = 'http://localhost:8081/diary'
    var imageURL = 'http://localhost:8081/static/'
    var home = 'index.html';
    let href = window.location.href;



    if (!href.includes(home)) {
        console.log(false)
        // for entries
        $.ajax({
            type: 'GET',
            url: url + '/all'
        })
            .done(function (response) {
                if (response.data.length >= 1) {
                    response.data.forEach(element => {
                        let date = new Date(Date.parse(element.createdAt))
                        let test = `<div class="w3-sidebar w3-bar-block w3-dark-grey " id='${element._id.substring(19, 24)}'>
                    <ul>
                        <li class="w3-bar-item w3-button icClose" id=${element._id}><i class='fa fa-close fa-lg'></i></li>
                        <li  class="w3-bar-item w3-button icEdit"  id=${element._id}><i class='fa fa-edit fa-lg'></i></li>
                        <li  class="w3-bar-item w3-button icDelete"  id=${element._id}      > <i class='fa fa-trash fa-lg'></i></li>
                    </ul>
                  </div>
                  `
                        templateString = ` <div class="posted media border p-3"  id='${element._id}'><img src="assets/note.png" alt="John Doe" class="mr-3 mt-3 "> 
                     <div class="media-body"> <h4>John Doe <small><i>Posted on ${date.toUTCString()}</i></small></h4><h5>${element.title}</h5> 
                     <img src=${imageURL}${element.img} alt='image'  class='center'>
                     <p>${element.body}</p> <br></div> <div class ='w3-teal'> <div class='w3-container'>  <button class="btn btn-secondary menu d-flex-inline" type="button" id=${element._id}><i class="fa fa-bars"> </i></button> </div> ${test}</div>  </div>`
                        $(templateString).appendTo('.content');
                        $('#newEntry').modal('hide');

                    });
                } else {
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
            });

        $('#btnAdd').click(function (f) {
            f.preventDefault()
            let title = $('#title').val();
            let body = $('#body').val();
            let fd = new FormData();
            var files = $('#uploadFile')[0].files[0];
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
                    if (response.message == 'Successfully Saved') {
                        swal({
                            title: "Saved Successfully",
                            icon: "success"
                        });
                        response = response.data
                        let date = new Date(Date.parse(response.createdAt))
                        let test = `<div class="w3-sidebar w3-bar-block w3-dark-grey " id='${response._id.substring(19, 24)}'>
                        <ul>
                            <li class="w3-bar-item w3-button icClose" id=${response._id}><i class='fa fa-close fa-lg'></i></li>
                            <li  class="w3-bar-item w3-button icEdit"  id=${response._id}><i class='fa fa-edit fa-lg'></i></li>
                            <li  class="w3-bar-item w3-button icDelete"  id=${response._id}      > <i class='fa fa-trash fa-lg'></i></li>
                        </ul>
                      </div>
                      `
                        templateString = ` <div class="posted media border p-3"  id='${response._id}'><img src="assets/note.png" alt="John Doe" class="mr-3 mt-3 "> 
                         <div class="media-body"> <h4>John Doe <small><i>Posted on ${date.toUTCString()}</i></small></h4><h5>${response.title}</h5> 
                         <img src=${imageURL}${response.img} alt='image'  class='center'>
                         <p>${response.body}</p> <br></div> <div class ='w3-teal'> <div class='w3-container'>  <button class="btn btn-secondary menu d-flex-inline" type="button" id=${response._id}><i class="fa fa-bars"> </i></button> </div> ${test}</div>  </div>`
                        $(templateString).appendTo('.content');
                        $('#title').val('');
                        $('#body').val('');
                        $('#uploadFile')[0].files[0] = null;
                        $('#status').hide()
                        $('#newEntry').modal('hide');
                    }
                })
                .fail(function (response) {
                    if (response.responseJSON.includes('body')) {
                        swal("Ooops", 'body is required', "error")
                        $('#body').css('border-color', 'red')
                    } else {
                        swal("Ooops", 'Something went wrong', "error")
                    }
                });


        });

    } else {

        //for home
        $.ajax({
            type: 'GET',
            url: url + '/latest'
        })
            .done(function (response) {
                if (response.data.length >= 1) {
                    response.data.forEach(element => {
                        let date = new Date(Date.parse(element.createdAt))
                        templateString = ` <div class="media border p-3" id='${element._id}'><img src="assets/note.png" alt="John Doe" class="mr-3 mt-3 "> 
                     <div class="media-body"> <h4>John Doe <small><i>Posted on ${date.toUTCString()}</i></small></h4><h5>${element.title}</h5> 
                     <p>${element.body}</p> <br></div> <div class="d-flex" > <button class="btn btn-primary btnView" type="button" > View</button>  </div> </div>`
                        $(templateString).appendTo('.content');
                        $('#newEntry').modal('hide');
                    });
                } else {
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



        $('#btnAdd').click(function (e) {
            e.preventDefault()
            let title = $('#title').val();
            let body = $('#body').val();
            let fd = new FormData();
            var files = $('#uploadFile')[0].files[0];
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
                    if (response.message == 'Successfully Saved') {
                        swal({
                            title: "Saved Successfully",
                            icon: "success"
                        });
                        response = response.data
                        let date = new Date(Date.parse(response.createdAt))
                        templateString = ` <div class="media border p-3" id='${response._id}'><img src="assets/note.png" alt="John Doe" class="mr-3 mt-3 "> 
                    <div class="media-body"> <h4>John Doe <small><i>Posted on ${date.toUTCString()}</i></small></h4><h5>${response.title}</h5> 
                    <p>${response.body}</p></div> <div class="d-flex-inline" > <button class="btn btn-primary btnView" type="button" > View</button> </div>  </div> </div>`
                        $('.content .media').last().remove();
                        $(templateString).prependTo('.content');
                        $('#title').val('');
                        $('#body').val('');
                        $('#uploadFile')[0].files[0] = null;
                        $('#status').hide()
                        $('#newEntry').modal('hide');
                    }
                })
                .fail(function (response) {
                    if (response.responseJSON.includes('body')) {
                        swal("Ooops", 'body is required', "error")
                        $('#body').css('border-color', 'red')
                    } else {
                        swal("Ooops", 'Something went wrong', "error")
                    }
                }); 


        });

    }


    $(document).on('click', '.menu', function () {

        let id = $(this).attr('id').substring(19, 24)
        $(`#${id}`).show()
        $(this).hide()
        $(document).on('click', '.icClose', function () {
            $(`#${id}`).hide()
            $('.menu').show()
        })

        $(document).on('click', '.icEdit', function () {
            alert(' update modal ')
        })

        $(document).on('click', '.icDelete', function () {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this entry!",
                icon: "warning",
                buttons: [true, true],
                dangerMode: true,
            })
                .then((willDelete) => {
                    let id = $(this).attr('id')
                    if (willDelete) {
                        $.ajax({
                            type: "POST",
                            url: url + '/delete/' + id
                        })
                            .done(function (response) {
                                console.log(response)
                                $(`#${response._id}`).remove()

                            })
                            .fail(function (response) {
                                alert(response)
                            })
                        swal("Successfully Deleted", {
                            icon: "success",
                            buttons: false,
                            timeout: 1000
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        });

    });


    $('.search').on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".content *").filter(function() {
            $(this).toggle($(this).parent().parent().text().indexOf(value) > -1)

       
//$(this).show($(this).parent().parent().text().indexOf(value) > -1)
           // $(this).show($(this).parent().parent().text().indexOf(value) > -1)

            let id = $(this).attr('id')
            //$(`#${id}`).hide()
        //   $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    

});