document.addEventListener('mouseover', function (event) {
  let element = event.target;

  // Verifique se o elemento é um preço, por exemplo, verificando o símbolo de moeda
  if (element.textContent.includes('$') || element.textContent.includes('R$')) {
    let precoOriginal = parseFloat(element.textContent.replace(/[^\d,]/g, '').replace(',', '.'));

    // Calcular imposto aduaneiro
    let taxaImposto = 0.60;  // Exemplo de 60% de imposto
    let precoComImposto = precoOriginal * (1 + taxaImposto);

    // Exibir as opções
    mostrarOpcoes(element, precoComImposto);
  }
});

function mostrarOpcoes(element, precoComImposto) {
  let div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.backgroundColor = '#fff';
  div.style.border = '1px solid #000';
  div.style.padding = '5px';
  div.style.zIndex = 1000;

  // Exibir as 3 opções com base no imposto
  div.innerHTML = `
    <div>Preço Original: R$ ${precoComImposto.toFixed(2)}</div>
    <div>Preço com 60% de imposto: R$ ${(precoComImposto * 1.6).toFixed(2)}</div>
    <div>Preço com 100% de imposto: R$ ${(precoComImposto * 2).toFixed(2)}</div>
  `;

  document.body.appendChild(div);

  // Posicionar div perto do elemento
  let rect = element.getBoundingClientRect();
  div.style.left = `${rect.left}px`;
  div.style.top = `${rect.bottom}px`;

  // Remover a div após um tempo ou quando o mouse sair
  element.addEventListener('mouseout', function () {
    div.remove();
  });
}
