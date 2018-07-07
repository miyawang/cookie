let hash = {}
$('#signUpForm').on('submit', (e) => {
  e.preventDefault();
  let need = ['email', 'password', 'password_confirmation'];
  need.forEach((name) => {
    // console.log(name);
    let value = $('#signUpForm').find(`[name=${name}]`).val();
    // console.log(value); 
    hash[name] = value;
  })
  $('#signUpForm').find('.error').each((index,span)=>{
    $(span).text('');
  })
  if(hash['email'] === ''){
    console.log('邮箱为空');    
    $('#signUpForm').find('[name="email"]').siblings('.error')
      .text('邮箱不能为空');
      return;
  }
  if(hash['password'] === ''){
    console.log('密码为空');    
    $('#signUpForm').find('[name="password"]').siblings('.error')
      .text('亲，密码不能为空');
      return;
  }
  if(hash['password_confirmation'] === ''){
    console.log('确认密码');    
    $('#signUpForm').find('[name="password_confirmation"]').siblings('.error')
      .text('亲，再输入一遍密码');
      return;
  }
  if(hash['password_confirmation'] !== hash['password']){
    console.log('两次密码输入不一致');    
    $('#signUpForm').find('[name="password_confirmation"]').siblings('.error')
      .text('两次密码输入不一致');
      return;
  }
  
  $.post('/sign_up', hash)
    .then((response) => {
      console.log(response);
    }, (request) => {
      // alert(request.responseText)
      // console.log(request.responseText);
      // let object = JSON.parse(request.responseText);
      // console.log(object);
      // let {errors} = JSON.parse(request.responseText);
      // console.log(errors);
      // 只要jQuery发现 这是一个json字符串 会自动帮我们parse
      // 因此我们可以省略parse那个步骤        
      // 后台设置下响应头  response.setHeader('Content-Type','application/json;charset=utf-8');
      let {errors} = request.responseJSON;
      // console.log(errors);
      // if(request.responseText === 'email is bad'){
      //   alert('亲，邮箱写错了')
      // }     
      if(errors.email && errors.email === 'invalid'){
        $('#signUpForm').find('[name="email"]').siblings('.error')
        .text('亲，邮箱格式有误哦')   
      }
    })
  // console.log(hash);  
})