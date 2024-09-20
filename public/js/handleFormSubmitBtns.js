const divBtns = document.querySelectorAll('[data-submit]');

for(let btn of divBtns) {
  const form = btn.closest('form')
  
  if(form) {
    btn.addEventListener('click', () => {
      form.submit()
    })
  }
}
