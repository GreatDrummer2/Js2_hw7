(function($){
 $(function(){
  $("div.wrapper > input[type='submit']").on('click',function(){
    var arr = $(":text").map(function(item){
      return this.value;
    });
    var obj ={
      username:'',
      password:'',
      email:'',
      gender:'',
      credit_card:'',
      bio:'',
      birth:'',
    }
    var counter = 0;
    for(var key in obj){
        obj[key] = arr[counter];
        counter++;
    }
    var callBack =  function(data){
      $(':text').removeClass('green').removeClass('red');
      if(data.result){
        $(':text').addClass('green');
      }
      else{
        $(':text').addClass('green');
        Object.keys(data.error).map(function(key){
          if(key == 'Credit Card'){
            $('.CreditCard').addClass('red');
            $('div.CreditCard').text(data.error[key]);
          }
          else{
            $('.' + key).addClass('red');
            $('div.' + key).text(data.error[key]);
          }
        });
      }
    }

    $.post('validator.php',obj,callBack,'json');
  });
 })
})(jQuery);
