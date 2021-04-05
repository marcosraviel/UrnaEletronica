let seuVotoPara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1-right");
let numeros = document.querySelector(".d-1-3");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;
function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = "";
    numero = "";
    votoBranco = false;

    for(let i = 0; i< etapa.numeros; i++ ){
        if (i === 0 ){
            numeroHtml += `<div class="number flash"></div>`;    
        }else {
            numeroHtml += `<div class="number"></div>`;
        }
        
    }
    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.display = "none";
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHtml;
    
}

function atualizaInterface(){
    
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) =>{
        if (item.numero === numero) {
            return true;
        }else {
            return false
        }
    });
    if( candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = "block";
        aviso.display = "block";
        descricao.innerHTML = `
            Nome: ${candidato.nome}<br/>
            Partido: ${candidato.partido}
        `;

        let fotosHtml = "";
        for(let i in candidato.fotos){
            if( candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`    
            }else {
                fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
            
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = `<div class="aviso-grande flash">VOTO NULO</div>`
    }
    
}

function clicou(n) {
  
  
    let elNumero = document.querySelector(".number.flash");
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove("flash");
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add("flash");
        }else{
            atualizaInterface();
        }
    }
    
}
function branco(){
    
    
    numero = "";
    votoBranco = true;
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    lateral.innerHTML = "";
    descricao.innerHTML = `<div class="aviso-grande flash">VOTO EM BRANCO</div>`

    
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    
    
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if( votoBranco === true){
        votoConfirmado = true;
        
    }else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        
    }if (votoConfirmado) {
        etapaAtual ++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            let tela = document.querySelector(".screen");
            tela.innerHTML = `<div class="aviso-gigante flash">FIM</div>`
            
        }
    }

}


comecarEtapa();