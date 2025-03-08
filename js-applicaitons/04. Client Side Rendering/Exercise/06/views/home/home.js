import renderAddBookComponent from './components/add-form.js';
import renderBookListComponent from './components/books-list.js';

export default async function homePage() {
    renderBookListComponent(true);
    renderAddBookComponent();
}
