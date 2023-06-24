let currentStep=0;/**variavel de controle  */

let form= document.querySelector('form')
let stepForms= document.querySelectorAll('.stepForm')




form.addEventListener('submit',(ev)=>{ /** retirar a função automatica de envio de formulario */
    ev.preventDefault()

    const data= new FormData(form) /** aqui eu pego todos os campos preenchidos do meu form  */

    
    alert(`Obrigado ${data.get('name')}, seu formulario foi enviado com sucesso!!!`)
  

    zerarInputs()

    updateProgressStep()

})
 form.addEventListener('click',(e)=>{
 if(!e.target.matches('[data-action]')){
    /**verificando se existe o elemento data-action, se nao existir ele encerra a função   */
    return
 }

 const actions={
    next(){
       if(!isValidInput()){
        return
       }
        currentStep++
    },
    prev(){
    currentStep--}
 }

 const action=e.target.dataset.action/** a variavel action recebe a ação  definido no data-action */
actions[action]()/** o objeto actions recebe a variavel action e o executa como uma função  que vai ser o next ou o prev  */



updateActiveStep()
updateProgressStep()

 })


 function updateActiveStep(){
    /**
 a função percorre todos os stepForms que contem a class active
 e depois adiciona o active a posição que estiver a variavel de controle 
 */
    stepForms.forEach(step => step.classList.remove('active'))
    stepForms[currentStep].classList.add('active')
 }


 const progressStep= document.querySelectorAll('.stepProgress [data-step]')

 function updateProgressStep(){
    console.log(progressStep)
    progressStep.forEach((step,index)=>{
        step.classList.remove('active')
        step.classList.remove('done')
        /** progressStep é percorrido utilizando o step e o seu index
         * no step removemos todas as classes active e done 
         * 
         * 
         * depois fazemos uma validação
         */
        if(index< currentStep +1){
            step.classList.add('active')
        }

        if(index< currentStep){
            step.classList.add('done')
        }
    })
 }

 /** validação */


 function isValidInput(){
    const currentFormStep= stepForms[currentStep]

    const formFilds=[...currentFormStep.querySelectorAll('input'),...currentFormStep.querySelectorAll('textarea')]
    return formFilds.every((input)=> input.reportValidity())
 }

 /* zerar inputs */

 function zerarInputs(){

    stepForms[currentStep].classList.remove('active')
    currentStep=0
    stepForms[currentStep].classList.add('active')


    const currentFormStep= stepForms[currentStep]

    const formFilds=[...currentFormStep.querySelectorAll('input'),...currentFormStep.querySelectorAll('textarea')]
    return formFilds.forEach(Element=> Element.value="")
 }