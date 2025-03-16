const showLader = () =>{
  document.getElementById('loader').classList.remove('hidden')
  document.getElementById('all-lessons').classList.add('hidden')
}
const hideLader = () =>{
  document.getElementById('loader').classList.add('hidden')
  document.getElementById('learn-scroll').classList.remove('hidden')
}

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
      behavior: 'smooth',
      block: 'center'
    })
  }
)

const faqButton = document.getElementById('faq').addEventListener('click', function(){
  document.getElementById('faq-section').scrollIntoView({
    behavior: 'smooth',
     block: 'center'
  })
})



const passwordInput          = document.getElementById('password-input');
const LearnVocabularies      = document.getElementById('learn-scroll');
const faqSection             = document.getElementById('faq-section');
const getStartedBtn          = document.getElementById('get-started-btn');
const navBarShow             = document.getElementById('navBar');
const firstSection           = document.getElementById('first-section');
const logOutBtn              = document.getElementById('logOut-btn');

LearnVocabularies.classList.add('hidden');
faqSection.classList.add('hidden');
navBarShow.classList.add('hidden');
firstSection.classList.add('block');

logOutBtn.addEventListener('click', 
  function(){
    LearnVocabularies.classList.add('hidden');
    faqSection.classList.add('hidden');
    firstSection.classList.remove('hidden')
  }
)

getStartedBtn.addEventListener('click', 
  function(){
    if (passwordInput.value === '123456') {
      LearnVocabularies.classList.remove('hidden')
      LearnVocabularies.classList.add('block')

      firstSection.classList.add('hidden')
      firstSection.classList.remove('block')

      navBarShow.classList.add('block');
      navBarShow.classList.remove('hidden');

      faqSection.classList.remove('hidden');
      faqSection.classList.add('block');

    }
    else{
      alert('Valid password needed only')
      LearnVocabularies.classList.remove('block')
      LearnVocabularies.classList.add('hidden')

      firstSection.classList.remove('hidden')
      firstSection.classList.add('block')

      navBarShow.classList.remove('block');
      navBarShow.classList.add('hidden');

      faqSection.classList.remove('block');
      faqSection.classList.add('hidden');

    }
  }
)


function hideLearnSection() {
  const sectionToHide = document.getElementById("hide-div");
  if (sectionToHide) {
      sectionToHide.style.display = "none"; // সেকশন হাইড করবে
  }
}



// fetch 

const loadAlLevels = async () => {
  
  await fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displayAllLevels(data.data));
};

function displayAllLevels(levels) {
   
  const LearnVocabulariesDiv = document.getElementById('Learn-Vocabularies');
  for (const level of levels) {
    const levelDiv = document.createElement('div');

    levelDiv.innerHTML = `
   <div id="category-buttons">
    <button onclick="hideLearnSection(); displayCategoryLevel(this, ${level.level_no}); loadCategoryWords(${level.level_no})" 
        class="btn btn-outline btn-primary category-btn">
        ${level.lessonName}
    </button>
</div>
    `;
    LearnVocabulariesDiv.append(levelDiv);
  }
}

function displayCategoryLevel(button, levelNo) {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
  console.log("Selected Level:", levelNo);
}


const loadCategoryWords = (level) =>{
  
  const url = `
  https://openapi.programming-hero.com/api/level/${level}
  `
  console.log(url)
  fetch(url)
  .then(res => res.json())
  .then(data => displayAllWords(data.data))

}
// id : 1
// level
// : 
// 3
// meaning
// : 
// null
// pronunciation
// : 
// "অবানডান্ট"
// word
// : 
// "Abundant"



const loadWordDetails = (wordId)=>{
  
  console.log(wordId)
  const url =`
  https://openapi.programming-hero.com/api/word/${wordId}
  `
  fetch(url)
  .then(res=> res.json())
  .then(data=> displayWordsDetails(data.data))
}

const displayWordsDetails = (word_word) => {
  
  console.log(word_word);
  document.getElementById('words_details').showModal();
  const detailsContainer = document.getElementById('details-container');


  const synonymsButtons = word_word.synonyms.map(synonym => 
    `<button class="btn btn-primary">${synonym}</button>`
  ).join(""); 

  detailsContainer.innerHTML = `
    <h1 class="text-3xl font-bold">${word_word.word}:   ${word_word.pronunciation} </h1>
    <h1 class="text-xl font-bold mt-2">Meaning</h1>
    <p class="text-lg">${word_word.meaning}</p>

    <h1 class="text-xl font-bold mt-4">Example</h1>
    <p class="text-lg">${word_word.sentence}</p>

    <h1 class="text-xl font-bold mt-4">সমার্থক শব্দ গুলো</h1>
    <div class="flex gap-2 flex-wrap mt-2">
      ${synonymsButtons}
      <br>
      <button class="btn btn-primary mt-7">Complete Learning</button>
    </div>
  `;
}


const displayAllWords = (words) => {
  
  console.log(words);
  const allLessons = document.getElementById('all-lessons');
  allLessons.innerHTML = "";

  if(words.length === 0){
   
    allLessons.innerHTML = `
    <div id="div-number-2" class="col-span-4 text-center flex flex-col items-center bg-[#F8F8F8] mx-14 rounded-xl mt-10 py-16">
                <img class="mb-2" src="assets/alert-error.png" alt="">
                <p class="text-[#79716B] text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="mt-3 text-[30px] text-[#292524]">নেক্সট Lesson এ যান</h1>
            </div>
    `
    return;
  }

  
words.forEach((word, index) => {
    console.log(word);
    const wordCard = document.createElement("div");
    const modalId = `modal_${index}`; 

    wordCard.innerHTML = `
      <div class="items-center  card bg-base-100 shadow-lg">
        <div class="card-body text-center">
          <h2 class="text-center text-[32px] font-bold mt-5 mb-5">${word.word}</h2>
          <p class="text-20px font-semibold">Meaning / Pronunciation</p>
          <h2 class="text-center text-[32px] font-bold mt-4">${word.meaning} / ${word.pronunciation}</h2>
          <div class="flex justify-between mt-20">
            <!-- Modal Open Button -->

            <button onclick='loadWordDetails(${word.id})' class="btn"><img src="fi-sr-info.png" alt=""></button>

            <!-- Volume Toggle Button -->
            <button class=""><label class="swap">
                <input type="checkbox" />
                <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                  <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                </svg>
                <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                  <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
                </svg>
              </label>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal (Unique ID for each word) -->
      
    `;
    
    allLessons.append(wordCard);
  });
  hideLader()
};


loadCategoryWords()
loadAlLevels();


