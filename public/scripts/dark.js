const nightModeStorage = localStorage.getItem('gmtNightMode');
const nightMode = document.getElementById('night-mode');
const pageElement = document.body;
if (nightModeStorage) {
    // ativa o night mode
    pageElement.classList.add('dark')
    // já deixa o input marcado como ativo
    nightMode.checked = true
  }

  nightMode.addEventListener('click', () => {
    // adiciona a classe `night-mode` ao html
    pageElement.classList.toggle('dark')
  
    // se tiver a classe night-mode
    if (pageElement.classList.contains('dark')) {
      // salva o tema no localStorage
      localStorage.setItem('gmtNightMode', true)
      return
    }
    // senão remove
    localStorage.removeItem('gmtNightMode')
  })