const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("synthwave"); 
  } else {
    document.body.classList.remove("synthwave"); 
  }
});

const learnScrollButton = document.getElementById("learn-scroll-button").addEventListener("click", 
  function(){
    document.getElementById("learn-scroll").scrollIntoView({
      behavior: 'smooth'
    })
  }
)

const faqButton = document.getElementById('faq').addEventListener('click', function(){
  document.getElementById('faq-section').scrollIntoView({
    behavior: 'smooth'
  })
})



const passwordInput      = document.getElementById('password-input');
const  LearnVocabularies = document.getElementById('learn-scroll');
const faqSection         = document.getElementById('faq-section');
const getStartedBtn      = document.getElementById('get-started-btn');
const navBarShow         = document.getElementById('navBar');

LearnVocabularies.classList.add('hidden');
faqSection.classList.add('hidden');
navBarShow.classList.add('hidden');

getStartedBtn.addEventListener('click', 
  function(){
    if (passwordInput.value === '123456') {
      LearnVocabularies.classList.remove('hidden')
      LearnVocabularies.classList.add('block')

      navBarShow.classList.add('block');
      navBarShow.classList.remove('hidden');

      faqSection.classList.remove('hidden');
      faqSection.classList.add('block');

    }
    else{
      alert('Valid password needed only')
      LearnVocabularies.classList.remove('block')
      LearnVocabularies.classList.add('hidden')

      navBarShow.classList.remove('block');
      navBarShow.classList.add('hidden');

      faqSection.classList.remove('block');
      faqSection.classList.add('hidden');

    }
  }
)