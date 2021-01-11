const container = document.getElementById('container');
const btnStart = container.querySelector('.btnStart');
const btnChoiceCube = container.querySelector('.choiceCube');
const boxChoiceCube = container.querySelector('.boxChoiceCube');
const cScore = container.querySelector('.cScore');
const blockOff = container.querySelector('.blockOff')


//>=== Cube bckColor
const colorCube = ['gold'];

//========== Button Start
btnStart.addEventListener('click', btnStartOn);
function btnStartOn() {

  btnStart.style.animation = 'aniBtnStart 1s ease-in';
  btnChoiceCube.style.animation = 'aniBtnChoiceCube 1s ease-in';

  let delateBtnMenu = () => { container.removeChild(btnStart); /* && */
    container.removeChild(btnChoiceCube); };
  setTimeout(delateBtnMenu, 1000); // <== delateBtnMenu && Etc...

  //========== Add Score
  let score = 0;
  setInterval(()=>{ cScore.innerHTML = score; }, 100);

  //========== Add Block
  function setOnBlock() {
    blockOff.classList.add('block');

    //Random position top block
    blockOff.addEventListener('animationiteration', topPosition);

    function topPosition(){
      let randomNum = -(Math.floor(Math.random() * 300));
      //console.log(randomNum);
      blockOff.style.top = `${randomNum}px`;
      
      //Increment score
      score++;
    }

  };

  setTimeout(() => { setOnBlock(); }, 3000);

  //========== Add Character
  btnStart.addEventListener('animationstart', () => {
    let timeOutCube = setTimeout(() => {

      function Cube(bckColor) {
        this.bckColor = bckColor;
        this.createCube = () => {
          const eCube = document.createElement('div');
          eCube.classList.add('eCubePsdueE');
          container.appendChild(eCube);
          
          eCube.style.zIndex = '7';
          eCube.style.width = '25px';
          eCube.style.height = '25px';
          eCube.style.position = 'absolute';
          eCube.style.top = '-25px';
          eCube.style.left = '15px';
          eCube.style.border = '1px solid black';
          eCube.style.backgroundColor = this.bckColor;

          let jumping = 0;

          //>=== Add gravity for cube
          let grv = setInterval(() => {
            let cubeTop =
            parseInt(window.getComputedStyle(eCube).getPropertyValue('top'));
            if(jumping == 0){
            eCube.style.top = `${cubeTop + 1.5}px`;
            };
          }, 10);

          //>=== Add jump function
            container.addEventListener('click', ()=>{
              jumping = 1;
              let jumpCount = 0;
              let jumpInterval = setInterval(()=>{
                let cubeTop =
                parseInt(window.getComputedStyle(eCube).getPropertyValue('top'));
                if(cubeTop > 6){
                  eCube.style.top = `${cubeTop -  2}px`;
                }
                if(jumpCount > 20){
                  clearInterval(jumpInterval);
                  jumping = 0;
                  jumpCount = 0;
                }
               
              jumpCount++;
              }, 10);
            });

          //>=== Add defeat logic
        let defeatInterval = setInterval(()=>{
        let cubeTop = parseInt(window.getComputedStyle(eCube).getPropertyValue('top')); 
        let blockLeft = parseInt(window.getComputedStyle(blockOff).getPropertyValue('left'));
        let blockTop = parseInt(window.getComputedStyle(blockOff).getPropertyValue('top'));

        let minCubeTop = -(471-cubeTop);
        if((cubeTop == 482) || (blockLeft <= 35 && minCubeTop > blockTop) || (blockLeft <= 35 && minCubeTop < blockTop - 77)){   //BlockTop makin kebawah makin besar negatifnya :v       
          
          //>=== Alert for defeat
           const alertt = document.createElement('div');
           const tAlertt = document.createTextNode(`game over`);
           alertt.classList.add('cAlertt');

           const eConfirm = document.createElement('span');
           const tEConfirm = document.createTextNode('ok');
           eConfirm.classList.add('cEConfirm')
            
           container.appendChild(alertt);
           alertt.appendChild(tAlertt);
           alertt.appendChild(eConfirm);
           eConfirm.appendChild(tEConfirm)
          
          //If user == 'ok' by eConfirm maka location.reload() / reload halaman.
          eConfirm.addEventListener('click', ()=>{
            location.reload();
          });
           
           //Action
           const vib = window.navigator.vibrate(100);
           blockOff.style.animationPlayState = 'paused';
           container.removeChild(eCube);
         }
        }, 10);      
        };

      };
      let cube = new Cube(colorCube[0]);
      cube.createCube();


    }, 1100);
  });

//>=== Hidden Box Choice Cube
  boxChoiceCube.classList.remove('cBoxChoiceCube');
  if(ada >= 4){
  ada -= 2;
  console.log(ada);
  boxChoiceCube.removeChild(cubeOne)
  boxChoiceCube.removeChild(cubeTwo)
  boxChoiceCube.removeChild(cubeTree)
  }

};

let ada = 2;

const cubeOne = document.createElement('span');
const cubeTwo = document.createElement('span');
const cubeTree = document.createElement('span');

cubeOne.classList.add('cubeOne')
cubeTwo.classList.add('cubeTwo')
cubeTree.classList.add('cubeTree')

//========== Button Choice Cube
btnChoiceCube.addEventListener('click', choiceCube);
function choiceCube(){
  boxChoiceCube.classList.toggle('cBoxChoiceCube');
  
  ada += 2;
  boxChoiceCube.appendChild(cubeOne)
  boxChoiceCube.appendChild(cubeTwo)
  boxChoiceCube.appendChild(cubeTree)
  
  if(ada > 4){
    ada -= 4;
    boxChoiceCube.removeChild(cubeOne)
    boxChoiceCube.removeChild(cubeTwo)
    boxChoiceCube.removeChild(cubeTree)
  };
};

//========== Event Choice Cube
cubeOne.addEventListener('click', ()=>{
  colorCube[0] = 'gold';
  cubeOne.style.border = '3px solid red';
  
  cubeTwo.style.border = '0px solid red';
  cubeTree.style.border = '0px solid red';

});

cubeTwo.addEventListener('click', ()=>{
  colorCube[0] = 'skyblue';
  cubeTwo.style.border = '3px solid red';
  
  cubeOne.style.border = '0px solid red';
  cubeTree.style.border = '0px solid red';

});

cubeTree.addEventListener('click', ()=>{
  colorCube[0] = 'salmon';
  cubeTree.style.border = '3px solid red';
  
  cubeOne.style.border = '0px solid red';
  cubeTwo.style.border = '0px solid red';

});

//hnffi