function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states =>  {
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }     
    }).catch (e => console.log(e));
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    // let evento = event.target.value;
    citySelect.innerHTML = '<option value>Selecione a Cidade</option>';
    citySelect.disabled = true;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
    .then(res => res.json())
    .then(citys => {
        
        for(const city of citys) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false;
    
        
    }).catch (e => console.log(e));
}

estado = document.querySelector("select[name=uf]")
.addEventListener("change" , getCities);

// Items de coleta
const collectedItems = document.querySelector("input[name=items]");

const itemsToCollect = document.querySelectorAll(".items-grid li")
for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target;
    itemLi.classList.toggle("selected");
    let itemId = itemLi.dataset.id;

    const alredySelected = selectedItems.findIndex( item => {
         const itemFound = item == itemId;
         return itemFound;
    });


    if(alredySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent;
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    console.log(selectedItems)

    //atualizar o campo escondido
    collectedItems.value = selectedItems;
}
