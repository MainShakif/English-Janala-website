const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((resp) => resp.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

// Step -2 Starts
const loadLessonsWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      removeActive(); //Remove Active Classes from Lessons buttons
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); //Add active class when clicked on a particular button.
      displayLessonsWords(data.data);
    });
};

// step:3
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const resp = await fetch(url);
  const details = await resp.json();
  displayWordDetail(details.data);
};

// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }

const displayWordDetail = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
   <div class="">
            <h2 class="text-2xl">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
            </h2>
          </div>
          <div>
            <h2 class="font-bold">meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div>
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div>
            <h2 class="font-bold">Synonym</h2>
            <span class="btn"></span>
            <span class="btn"></span>
            <span class="btn"></span>
          </div>
  `;
  document.getElementById("word_modal").showModal();
};
// step:3 Ends here

const displayLessonsWords = (words) => {
  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = "";

  // ! কন্ডিশন : যদি কোন কার্ড পাওয়া না যায় সেই ক্ষেত্রে.........
  if (words.length == 0) {
    wordsContainer.innerHTML = `
   
   <div
        class="bg-[#F8F8F8] py-10 text-center col-span-full space-y-8 font-bangla"
      >
      <img class="mx-auto w-[150px]" src="./assets/alert-error.png" />
        <p class="text-[#79716B] font-semibold">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
`;
    return;
  }

  // {id: 19,
  // level: 1,
  // word: 'Sincere',
  // meaning: 'সত্‍ / আন্তরিক',
  // pronunciation: 'সিনসিয়ার'
  // }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white py-15 px-2 text-center rounded-sm space-y-4">
        <h3 class="text-2xl font-bold">${word.word ? word.word : "শব্দার্থ পাওয়া যায়নি"}</h3>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <h2 class="text-xl font-bangla">"${word.meaning ? word.meaning : "কোন অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "কোন উচ্চারন পাওয়া যায়নি"}"</h2>

        <div class="flex justify-between items-center px-5">
          <button onclick="loadWordDetail(${word.id})" class="bg-[#1A91FF10] hover:bg-[#1A91FF80] p-4 rounded-sm">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80] p-4 rounded-sm">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
      `;
    wordsContainer.append(card);
  });
};
// Step -2 END

// --------------------------------------------------------------------------------

// Step : 1 *************
const displayLessons = (lessons) => {
  //  1.get the container and make it empty
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";

  //   2.get into every lesson
  for (let lesson of lessons) {
    // !console.log(lesson.level_no);
    // 3.create element
    const btnsDiv = document.createElement("div");
    btnsDiv.innerHTML = `
            
            <button id="lesson-btn-${lesson.level_no}" 
                onclick ="loadLessonsWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i>  
                Lesson - ${lesson.level_no}
            </button>
          `;
    // 4.append the button div
    lessonsContainer.append(btnsDiv);
  }
};

loadLessons();
