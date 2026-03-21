const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((resp) => resp.json())
    .then((json) => displayLessons(json.data));
};

const displayLessons = (lessons) => {
  console.log(lessons);
  //  1.get the container and make it empty
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";

  //   2.get into every lesson
  for (let lesson of lessons) {
    // 3.create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>  
                Lesson- ${lesson.level_no}
            </button>
    
    `;
    // 4.append the button div
    lessonsContainer.append(btnDiv);
  }
};

loadLessons();
