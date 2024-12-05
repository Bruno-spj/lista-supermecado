// Seleciona os elementos do DOM
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');

// Carrega a lista do localStorage
function carregarLista() {
    const itensSalvos = JSON.parse(localStorage.getItem('listaSupermercado')) || [];
    itensSalvos.forEach(item => adicionarItemALista(item));
}

// Salva a lista no localStorage
function salvarLista() {
    const itens = Array.from(shoppingList.children).map(li => li.textContent.replace('Excluir', '').trim());
    localStorage.setItem('listaSupermercado', JSON.stringify(itens));
}

// Adiciona um novo item à lista
function adicionarItemALista(item) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${item}
        <button class="delete-btn">Excluir</button>
    `;

    // Adiciona evento de exclusão
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        shoppingList.removeChild(li);
        salvarLista();
    });

    shoppingList.appendChild(li);
}

// Evento para adicionar item
addBtn.addEventListener('click', () => {
    const novoItem = itemInput.value.trim();
    if (novoItem) {
        adicionarItemALista(novoItem);
        itemInput.value = '';
        salvarLista();
    }
});

// Permite adicionar item com Enter
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Carrega lista salva ao iniciar
carregarLista();