

const form = document.getElementById('_login');

console.dir(form)
const submit = form.elements[2];

submit.addEventListener('click', () => {
  console.dir(form.elements)
  const authHeader = btoa(`${form.elements[0].value}:${form.elements[1].value}`);
  console.log(authHeader);
  $.ajax({
    url: '/signin', 
    method: 'POST',
    headers: { "authorization" : `basic ${authHeader}` }
  })
})
