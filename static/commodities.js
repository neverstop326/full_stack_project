

$(document).ready(function () {
 
    var commodity_list = $("#commodity_list"); 

    function deleteHandler(e) {
       
        var title = e.target.value;
        $.ajax({
            url: '/api/commodities',
            type: 'DELETE',
            data: {_id: e.target.id, title: title},
        }).done(function (data, status, req) {
            console.log(data);
            $(data._id)
            var _id = data._id;
            $(`#${_id}`).parent().remove();
        }).fail(function (req, status, err) {
            alert(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        })         
    }

    function buildListItem(title, _id) {
        _id = _id || 'temporary-list-item-id';
        commodity_list.append(`<li id='li-${_id}'>${title} </li>`);
        var button = document.createElement('button');
        button.id = _id;
        button.name = `${title}`;
        button.value = `${title}`;
        button.addEventListener('click', deleteHandler);
        button.innerText = 'X';
        $(`#li-${_id}`).append(button);        
    }

    var data = $.get('/api/commodities').done(function(data){
      
        for (commodity of data.commoditiesList) {
   
            var _id = commodity._id;
            commodity_list.append(`<li id='li-${_id}'>${commodity.add_commodity}</li>`);

            var button = document.createElement('button');
            button.id = _id;
            button.name = `${commodity.add_commodity}`;
            button.value = `${commodity.add_commodity}`;
            button.addEventListener('click', deleteHandler);
            button.innerText = 'X';

          
            $(`#li-${_id}`).append(button);
        }
    }).fail(function (err){
        alert(`Uh oh! Something went wrong, got: ${err}`);
    })


    
  

    var submit = $('#submit').on('click', function(e){
        var input = $("#add_commodity");
        
        $.post(
            '/api/commodities', 
            {
                add_commodity: input.val(),
                

            }
        ).done(function (data, status, req) {
            console.log(`Added: ${input.val()} to the collection!`);
            buildListItem(input.val());
            input.val('');
        }
        ).fail(function (req, status, err) {
            alert(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        })
    })
    
})
