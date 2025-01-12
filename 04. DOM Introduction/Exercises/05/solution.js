function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const searchInput = document.querySelector('#searchField');
      const searchQuery = searchInput.value;

      searchInput.textContent = '';

      [...document.querySelectorAll('tbody tr')]
         .forEach(r => {
            r.classList.remove('select');
            if(searchQuery && r.textContent.includes(searchQuery)) {
               r.classList.add('select');
            }
         })
   }
}