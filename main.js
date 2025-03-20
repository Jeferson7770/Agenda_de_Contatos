document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-agenda");
    const nomeContatoInput = document.getElementById("nome-contato");
    const numeroTelefoneInput = document.getElementById("numero-telefone");
    const emailInput = document.getElementById("email");
    const tabelaCorpo = document.querySelector("tbody");
    let contatoEditando = null;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        if (contatoEditando) {
            salvarEdicao();
        } else {
            adicionarContato();
        }
    });

    function adicionarContato() {
        const nome = nomeContatoInput.value.trim();
        const telefone = numeroTelefoneInput.value.trim();
        const email = emailInput.value.trim();

        if (!validarEntrada(nome, telefone, email)) {
            return;
        }

        if (contatoExiste(nome, telefone, email)) {
            alert("Nome, telefone ou e-mail já existem!");
            return;
        }

        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${nome}</td>
            <td>${telefone}</td>
            <td>${email}</td>
            <td>
                <button class="btn btn-edit">Editar</button>
                <button class="btn btn-delete">Excluir</button>
            </td>
        `;

        tabelaCorpo.appendChild(novaLinha);
        limparCampos();

        novaLinha.querySelector(".btn-edit").addEventListener("click", function () {
            editarContato(novaLinha);
        });

        novaLinha.querySelector(".btn-delete").addEventListener("click", function () {
            excluirContato(novaLinha);
        });
    }

    function editarContato(linha) {
        contatoEditando = linha;
        const colunas = linha.querySelectorAll("td");
        
        nomeContatoInput.value = colunas[0].textContent;
        numeroTelefoneInput.value = colunas[1].textContent;
        emailInput.value = colunas[2].textContent;

        form.querySelector("button").textContent = "Salvar Edição";
    }

    function salvarEdicao() {
        if (!contatoEditando) return;

        const colunas = contatoEditando.querySelectorAll("td");

        const nome = nomeContatoInput.value.trim();
        const telefone = numeroTelefoneInput.value.trim();
        const email = emailInput.value.trim();

        if (!validarEntrada(nome, telefone, email)) {
            return;
        }

        colunas[0].textContent = nome;
        colunas[1].textContent = telefone;
        colunas[2].textContent = email;

        contatoEditando = null;
        form.querySelector("button").textContent = "Adicionar +";
        limparCampos();
    }

    function excluirContato(linha) {
        if (confirm("Tem certeza que deseja excluir este contato?")) {
            linha.remove();
        }
    }

    function limparCampos() {
        nomeContatoInput.value = "";
        numeroTelefoneInput.value = "";
        emailInput.value = "";
    }

    function contatoExiste(nome, telefone, email) {
        const contatos = tabelaCorpo.querySelectorAll("tr");
        for (let contato of contatos) {
            const colunas = contato.querySelectorAll("td");
            const nomeExistente = colunas[0].textContent;
            const telefoneExistente = colunas[1].textContent;
            const emailExistente = colunas[2].textContent;
    
            if (nomeExistente === nome || telefoneExistente === telefone || (email !== "" && emailExistente === email)) {
                return true;
            }
        }
        return false;
    }
    

    function validarEntrada(nome, telefone, email) {
        const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
        const telefoneRegex = /^\d{11}$/; 
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!nomeRegex.test(nome)) {
            alert("O nome deve conter apenas letras e espaços.");
            return false;
        }
        
        if (!telefoneRegex.test(telefone)) {
            alert("O telefone deve conter 11 números, sem  espaços ou caracteres especiais.");
            return false;
        }
        
        if (email !== "" && !emailRegex.test(email)) {
            alert("E-mail inválido.");
            return false;
        }
        
        return true;
    }

});