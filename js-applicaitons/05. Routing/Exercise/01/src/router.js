import page from '../node_modules/page/page.mjs';
import { deleteFurniture } from './utils/delete-product.js';
import logout from './utils/logout.js';
import createFurniturePage from './views/create.js';
import furnitureDetailsPage from './views/details.js';
import homePage from './views/home.js';
import loginPage from './views/login.js';
import registerPage from './views/register.js';

page('/', homePage);
page('/register', registerPage);
page('/login', loginPage);
page('/logout', logout);
page('/create', createFurniturePage);
page('/details/:id', furnitureDetailsPage);
page('/delete/:id', deleteFurniture);

export default function enableRouting() {
    page.start();
}