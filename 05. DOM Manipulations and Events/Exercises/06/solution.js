function solve() {


  const inputForm = document.querySelector("#exercise button");
  inputForm.addEventListener("click", generateFurnitures);

  const shopFrom = document.querySelector("#exercise button:last-child");
  shopFrom.addEventListener("click", buyFurnitures);


  function generateFurnitures(e) {
      const furnituresDataInput = document.querySelector("textarea");
      const furnituresData = JSON.parse(furnituresDataInput.value);

      const shopBodyEl = document.querySelector(".table tbody");
      console.log(shopBodyEl);

      console.log(furnituresData);
      furnituresData.forEach((f) => {
          const furnitureEl = generateFurnitureEl(f);
          console.log(furnitureEl);
          shopBodyEl.appendChild(furnitureEl);
      });
  }

  function buyFurnitures(e) {
      const selectedFurnitures = document.querySelectorAll(
          'tr:has(input[type="checkbox"]:checked)'
      );

      const selectedFurniture = [...selectedFurnitures].map((e) =>
          JSON.parse(e.dataset.furniture)
      );
      const names = selectedFurniture.map((e) => e.name);
      const totalPrice = selectedFurniture
          .map((e) => +e.price)
          .reduce((sum, c) => sum + c, 0);
      const avgDecFactor =
          selectedFurniture
              .map((e) => +e.decFactor)
              .reduce((sum, c) => sum + c, 0) / selectedFurniture.length;
      const outputEl = document.querySelector('textarea:last-of-type');
      outputEl.textContent += `Bought furniture: ${names.join(', ')}\n`;
      outputEl.textContent += `Total price: ${totalPrice.toFixed(2)}\n`;
      outputEl.textContent += `Average decoration factor: ${avgDecFactor}`;
  }

  function generateFurnitureEl(furniture) {
      const furnitureEl = document.createElement("tr");
      furnitureEl.dataset.furniture = JSON.stringify(furniture);

      const imgTd = createTd();
      const imgEl = document.createElement("img");
      imgEl.src = furniture.img;
      imgTd.appendChild(imgEl);

      const nameTd = createTd();
      const nameEl = document.createElement("p");
      nameEl.textContent = furniture.name;
      nameTd.appendChild(nameEl);

      const priceTd = createTd();
      const priceEl = document.createElement("p");
      priceEl.textContent = furniture.price;
      priceTd.append(priceEl);

      const decFactorTd = createTd();
      const decFactorEl = document.createElement("p");
      decFactorEl.textContent = furniture.decFactor;
      decFactorTd.appendChild(decFactorEl);

      const markTd = createTd();
      const markEl = document.createElement("input");
      markEl.type = "checkbox";
      markTd.appendChild(markEl);

      furnitureEl.appendChild(imgTd);
      furnitureEl.appendChild(nameTd);
      furnitureEl.appendChild(priceTd);
      furnitureEl.appendChild(decFactorTd);
      furnitureEl.appendChild(markTd);

      return furnitureEl;
  }

  function createTd() {
      return document.createElement("td");
  }
}