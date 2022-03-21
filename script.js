const tabuleiro = document.querySelector(".tabuleiro")
const quadrados = document.querySelectorAll(".quadrado")
const modalResult = document.querySelector(".alertResult")

let isX = true;
let matriz = [["", "", ""], ["", "", ""], ["", "", ""]]

const jogador1 = {
  name: document.getElementById("jogador1"),
  score: document.getElementById("score1"),
  symbol: "X",
  color: "red"
}

const jogador2 = {
  name: document.getElementById("jogador2"),
  score: document.getElementById("score2"),
  symbol: "O",
  color: "blue"
}

jogador1.name.classList.add("borderBlack")

function eventClick(event) {
  const quadrado = event.target

  if(quadrado.textContent) {
    return alert("Esse quadrado já está preenchido")
  }

  // Pega o jogador Atual e o outro Jogador
  const jogadorAtual = isX ? jogador1 : jogador2
  const outroJogador = isX ? jogador2 : jogador1

  // marcar a vez do jogador
  changeBorder(outroJogador, jogadorAtual)
  isX = !isX

  // adiciona X ou O no quadrado
  quadrado.textContent = jogadorAtual.symbol
  quadrado.classList.add(jogadorAtual.color)

  // Pega atraves do id a posicao da matriz e adiciona o conteudo nela
  const row = Number(quadrado.id.split("-")[1]) - 1
  const column = Number(quadrado.id.split("-")[2]) - 1
  matriz[row][column] = quadrado.textContent

  verifyResult(matriz, row, column, jogadorAtual)
}

tabuleiro.addEventListener("click", eventClick)

// verifica o resultado
function verifyResult(matriz, row, column, jogador) {
  // Verifica resultado na vertical, se toda a coluna é igual ao simbolo
  const winVertical = matriz[0][column] === matriz[1][column] && matriz[1][column] === matriz[2][column]
  
  // Verifica resultado na horizontal, se toda a linha é igual ao simbolo
  const winHorizonal = matriz[row][0] === matriz[row][1] && matriz[row][1] === matriz[row][2]
  let winDiagonal = false
  
  // Verifica resultado na diagonal, caso o simbolo atual esteja no meio
  if ((row === 1 && column === 1) || jogador.symbol === matriz[1][1]) {
    winDiagonal = (matriz[row][column] === matriz[0][0] && matriz[row][column] === matriz[2][2]) ||
      (matriz[row][column] === matriz[0][2] && matriz[row][column] === matriz[2][0])
  }

  const win = winHorizonal || winVertical || winDiagonal
  
  if(win) {
    modalWin(jogador.name.value + " ganhou!")
    jogador.score.textContent++
    
    if(jogador === jogador1) {
      isX = true
      changeBorder(jogador1, jogador2)
    } else {
      isX = false
      changeBorder(jogador2, jogador1)
    }
  
  } else if (matriz.every(r => r.every(c => c != ""))) {
    modalWin("Empate!")
  }
}

function restartGame(reset = false) {
  quadrados.forEach(elemento => {
    elemento.innerHTML = ""
    elemento.classList.remove("red", "blue")
  })
  matriz = [["", "", ""], ["", "", ""], ["", "", ""]]
  tabuleiro.addEventListener("click", eventClick)
  
  modalResult.style.display = 'none'
  if(reset) {
    isX = true
    changeBorder(jogador1, jogador2)
    jogador1.score.textContent = 0
    jogador2.score.textContent = 0
  }
}

function modalWin(ganhador) {
  tabuleiro.removeEventListener("click", eventClick)
  modalResult.style.display = 'block'
  modalResult.querySelector(".ganhador").textContent = ganhador
}

function changeBorder(jogadorAdd, jogadorRemove) {
  jogadorAdd.name.classList.add("borderBlack")
  jogadorRemove.name.classList.remove("borderBlack")
}