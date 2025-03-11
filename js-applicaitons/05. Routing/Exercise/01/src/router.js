import page from '../node_modules/page/page.mjs';
import { deleteFurniture } from './utils/delete-product.js';
import logout from './utils/logout.js';
import createFurniturePage from './views/create.js';
import furnitureDetailsPage from './views/details.js';
import editFurniturePage from './views/eidt.js';
import homePage from './views/home.js';
import loginPage from './views/login.js';
import myFurniturePage from './views/my-furniture.js';
import registerPage from './views/register.js';

page('/', homePage);
page('/register', registerPage);
page('/login', loginPage);
page('/logout', logout);
page('/create', createFurniturePage);
page('/edit/:id', editFurniturePage);
page('/details/:id', furnitureDetailsPage);
page('/delete/:id', deleteFurniture);
page('/my-furniture', myFurniturePage);

export default function enableRouting() {
    page.start();
}