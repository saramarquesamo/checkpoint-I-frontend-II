let nome = document.getElementsByClassName("nome-class");
let caract = document.getElementsByClassName("caract");
let img = document.getElementsByClassName("img-upload");

function changeImage(a) {
  let img = document.getElementsByClassName("img-upload");
  if (img[0].value) {
    document.getElementById("img-register").src = img[0].value;
  } else {
    document.getElementById("img-register").src = "../assets/camera.png";
  }
}

function addNewDog() {
  var existingEntries = JSON.parse(localStorage.getItem("dogs"));
  if (existingEntries == null) existingEntries = [];
  let radioValue = getRadioButton();

  let verifyInput = verifyInputs();
  if (verifyInput) {
    var entry = {
      nome: nome[0].value,
      caract: caract[0].value,
      img: img[0].value,
      radioValue: radioValue,
    };
    localStorage.setItem("entry", JSON.stringify(entry));
    existingEntries.push(entry);
    localStorage.setItem("dogs", JSON.stringify(existingEntries));
    location.reload();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos os campos precisam estar preenchidos!",
      footer: "<p>Não deixe o doguinho esperando ...</p>",
    });
  }
}

function verifyInputs() {
  if (!nome[0].value) {
    return false;
  }
  if (!caract[0].value) {
    return false;
  }
  if (!img[0].value) {
    return false;
  }
  return true;
}

function getRadioButton() {
  const radioButtons = document.getElementsByName("inlineRadioOptions");
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
}

function render() {
  let arrayDeDogs = JSON.parse(localStorage.getItem("dogs"));
  if (arrayDeDogs) {
    for (const dogs of arrayDeDogs) {
      console.log(dogs);
      let str = `          <div class="col-md-4 col-sm-12 cards-space">
     <div class="card">
       <p class="card-title align-self-center">${dogs.nome}</p>
       <p class="card-title align-self-center">${dogs.radioValue}</p>
       <img
         src="${dogs.img}"
         class="img-adopt-dog"
         alt="..."
       />
       <div class="card-body align-self-center">
         <p class="text-wrap">
         ${dogs.caract}
         </p>
       </div>
       <div class="card-body align-self-center">
       <button
       type="button"
       class="btn btn-warning btn-primary-white rounded-pill button-wdth"
     >
       Adotar
     </button>
       </div>
     </div>
   </div>`;
      document.getElementById("cards-dinamic").innerHTML += str;
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Nenhum cachorro disponível para adoção!",
      footer: "<p>Logo logo seu novo melhor amigo será listado aqui ...</p>",
    });
  }
}
