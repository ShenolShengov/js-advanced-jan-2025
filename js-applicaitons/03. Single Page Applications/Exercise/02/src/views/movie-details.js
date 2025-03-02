
const container = document.getElementById('container');

export default function movieDetailsPage(data) {
    const loader = document.createElement('p');
    loader.textContent = 'Still in process...';
    container.appendChild(loader);
}