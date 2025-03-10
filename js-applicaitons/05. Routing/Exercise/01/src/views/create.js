import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { autorizationHeaders } from '../utils/headers.js';

const main = document.querySelector('.main-section');
const baseUrl = 'http://localhost:3030/data/catalog';

const validator = {
    make: (m) => m.length >= 4,
    model: (m) => validator['make'](m),
    year: (y) => Number.isInteger(+y) && +y >= 1950 && +y <= 2050,
    description: (d) => d.length > 10,
    price: (p) => Number.isFinite(+p) && +p > 0,
    img: (i) => i !== '',
    material: m => true
};

export default async function createFurniturePage() {
    render(createFurnitureTemplate(), main);
}

function createFurnitureTemplate() {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Create New Furniture</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form @submit=${onSubmit} @input=${onInputChange}>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-make">Make</label>
                            <input class="form-control valid" id="new-make" type="text" name="make" />
                        </div>
                        <div class="form-group has-success">
                            <label class="form-control-label" for="new-model">Model</label>
                            <input class="form-control" id="new-model" type="text" name="model" />
                        </div>
                        <div class="form-group has-danger">
                            <label class="form-control-label" for="new-year">Year</label>
                            <input class="form-control" id="new-year" type="number" name="year" />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-description">Description</label>
                            <input class="form-control" id="new-description" type="text" name="description" />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-price">Price</label>
                            <input class="form-control" id="new-price" type="number" name="price" />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-image">Image</label>
                            <input class="form-control" id="new-image" type="text" name="img" />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-material">Material (optional)</label>
                            <input class="form-control" id="new-material" type="text" name="material" />
                        </div>
                        <input type="submit" class="btn btn-primary" value="Create" />
                    </div>
                </div>
            </form>
        </div>
    `;
}

function onInputChange(e) {
    const input = e.target;
    const {name, value} = input;
    const isValid = validator[name](value);
    e.target.classList.add(isValid ? 'is-valid' : 'is-invalid');
    e.target.classList.remove(isValid ? 'is-invalid' : 'is-valid');
}

async function onSubmit(e) {
    e.preventDefault();
    const furnitureData = Object.fromEntries(new FormData(e.target));
    if (!isValidFurnitureData(furnitureData)) {
        alert('Invalid furniture data');
        return;
    }
    await createFurniture(furnitureData);
}

async function createFurniture(furnitureData) {
    try {
        const res = await fetch(baseUrl, {
            method: 'post',
            body: JSON.stringify(furnitureData),
            headers: autorizationHeaders()
        });
        if (!res.ok) {
            throw new Error('Error in creating furniture process');
        }
        page('/');
    } catch (err) {
        alert(err.message);
    }
}

function isValidFurnitureData(furnitureData) {
    return Object.entries(furnitureData).every(([k, v]) => {
        return validator[k](v);
    });
}
