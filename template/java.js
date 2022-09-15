const content= document.querySelectorAll('p');

content.forEach(par=>{
    console.log(par.textContent);
if (par.textContent.includes('success')) {
   par.classList.add('success')
};
if (par.textContent.includes('fails')) {
    par.classList.add('fails')
    };

})