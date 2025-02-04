window.addEventListener("load", solve);

function solve() {
    function extractInput(id) {
        return document.querySelector('#' + id);
    }

    const html = {
        type: extractInput('type'),
        intensity: extractInput('intensity'),
        calories: extractInput('calories'),
        duration: extractInput('duration'),
        date: extractInput('date'),
    };

    const addActiviyBtn = document.querySelector('#add-activity');

    addActiviyBtn.addEventListener('click', addActiviyHandler);

    function addActiviyHandler(e) {
        const activityData = Object.entries(html).reduce(
            (data, [id, input]) => {
                data[id] = input.value;
                return data;
            },
            {}
        );

        if (Object.values(activityData).some((v) => v === '')) {
            return;
        }

        const previewActivityEl = document.querySelector('#preview-activity');
        const activityEl = createActivity(activityData);
        previewActivityEl.appendChild(activityEl);
        this.disabled = true;

        Object.values(html).forEach(i => i.value = '');
    }

    function createActivity(data) {
        const activityEl = document.createElement('li');
        Object.assign(activityEl.dataset, data);
        const article = document.createElement('article');
        activityEl.appendChild(article);

        const type = document.createElement('p');
        type.textContent = `Activity: ${data.type}`;
        article.appendChild(type);

        const intensity = document.createElement('p');
        intensity.textContent = `Intensity: ${data.intensity}`;
        article.appendChild(intensity);

        const duration = document.createElement('p');
        duration.textContent = `Duration: ${data.duration} min.`;
        article.appendChild(duration);

        const date = document.createElement('p');
        date.textContent = `Date: ${data.date}`;
        article.appendChild(date);

        const calories = document.createElement('p');
        calories.textContent = `Calories: ${data.calories} `;
        article.appendChild(calories);

        const btns = document.createElement('div');
        btns.className = 'btn-container';
        activityEl.appendChild(btns);

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editActivityHandler);
        btns.appendChild(editBtn);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', nextActivityHandler);
        btns.appendChild(nextBtn);
        

        return activityEl;
    }

    function getActivityEl() {
      return this.parentElement.parentElement;
    }

    function nextActivityHandler(e) {
      const activityEl = getActivityEl.call(this);
      activityEl.remove();
      const acitiveTable = document.querySelector('#activities-table');

      const trEl = createNextActivityRow(activityEl.dataset);

      acitiveTable.appendChild(trEl);
      addActiviyBtn.disabled = false;
    }

    function createNextActivityRow(data) {
      const trEl = document.createElement('tr');

      const dataOrder = ['type', 'duration', 'calories', 'date', 'intensity'];

      dataOrder.forEach(id => {
        const tdEl = document.createElement('td');
        tdEl.textContent = data[id];
        tdEl.className = `${id}-cell`;
        trEl.appendChild(tdEl);
      });

      const btnCell = document.createElement('td');
      btnCell.className = 'btn-cell';
      trEl.appendChild(btnCell);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', deleteActivityHandler);
      btnCell.appendChild(deleteBtn);


      return trEl;
    }

    function deleteActivityHandler() {
      this.parentElement.parentElement.remove();
    }

    function editActivityHandler(e) {
      const activityEl = getActivityEl.call(this);
      Object.entries(html).forEach(([id, input]) => input.value = activityEl.dataset[id]);
      activityEl.remove();
      addActiviyBtn.disabled = false;
    }
}
