function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
// Definindo variáveis globais
let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  // Usando map() para ajustar a cor de fundo de forma mais controlada
  let corFundo = lerpColor(color(217, 112, 26), color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1));

  background(corFundo);

  mostrarInformacoes();

  temperatura += 0.05; // Ajustei um pouco a velocidade da temperatura para não subir tão rápido

  jardineiro.atualizar();
  jardineiro.mostrar();

  // Verifica se o jogo acabou
  verificarFimDeJogo();

  // Usando map() para aplicar o comportamento de árvores plantadas
  // Aqui, 'arvore' deve ser uma instância de uma classe Arvore que tenha o método mostrar()
  plantas.map((arvore) => arvore.mostrar());
}

// Função para mostrar as informações na tela
function mostrarInformacoes() {


  textSize(16);
  fill(0);

  // Adicionando as chamadas para a função text() aqui
  text('Temperatura: ' + nf(temperatura, 0, 1) + '°C', 20, 30); // nf formata o número para 1 casa decimal
  text('Árvores Plantadas: ' + totalArvores, 20, 50);
  text('Pressione as setas para mover o jardineiro.', 20, 80); // Dica para o jogador
}

// Classe Jardineiro - AGORA COM MOVIMENTO
class Jardineiro {
  constructor(x, y) {

    this.x = x;
    this.y = y;
    this.size = 40; // Tamanho do jardineiro
    this.velocidade = 3; // Velocidade de movimento
  }

  atualizar() {
    // Lógica de movimento baseada nas teclas de seta
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }

    // Limitar o movimento do jardineiro para dentro da tela
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }

  mostrar() {
    fill(100, 50, 0); // Cor marrom para o corpo do jardineiro
    noStroke();
    ellipse(this.x, this.y, this.size); // Corpo do jardineiro

    // Desenhar uma "cabeça" para o jardineiro
    fill(255, 200, 150); // Cor de pele
    ellipse(this.x, this.y - this.size / 2, this.size * 0.6);

    // Desenhar um chapéu (opcional)
    fill(50, 150, 50); // Cor verde para o chapéu
    rect(this.x - this.size * 0.4, this.y - this.size * 0.9, this.size * 0.8, this.size * 0.3);
  }
}

// Funções e classes que você provavelmente precisa para o jogo funcionar:

// Exemplo de uma classe Arvore (se você estiver usando para 'plantas')
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 30;
    this.saude = 100; // Exemplo: saúde da árvore
  }

  mostrar() {
    // Tronco
    fill(139, 69, 19); // Marrom
    rect(this.x - this.tamanho / 4, this.y, this.tamanho / 2, this.tamanho);

    // Folhas
    fill(34, 139, 34); // Verde floresta
    ellipse(this.x, this.y, this.tamanho * 1.2, this.tamanho * 1.5);
  }
}

// Função para verificar o fim de jogo
function verificarFimDeJogo() {
  // Exemplo: se a temperatura for muito alta, o jogo termina
  if (temperatura > 40) { // Limite de temperatura
    background(255, 0, 0); // Fundo vermelho para indicar o fim
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('FIM DE JOGO: TEMPERATURA MUITO ALTA!', width / 2, height / 2);
    noLoop(); // Para o loop draw()
  }

  // Você pode adicionar outras condições para o fim do jogo,
  // como número de árvores, tempo, etc.
}

// Exemplo de como adicionar uma planta (árvore) ao clicar com o mouse
function mousePressed() {
  // Adiciona uma nova árvore na posição do mouse
  plantas.push(new Arvore(mouseX, mouseY));
  totalArvores++; // Incrementa o contador de árvores
}