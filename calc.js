// Food data (per 100g)
        const foodData = [
            { name: "Chicken breast (cooked)", protein: 31, calories: 165, source: "meat" },
            { name: "Eggs (whole)", protein: 13, calories: 155, source: "meat" },
            { name: "Fish (salmon)", protein: 20, calories: 208, source: "meat" },
            { name: "Paneer", protein: 18, calories: 265, source: "dairy" },
            { name: "Tofu", protein: 8, calories: 76, source: "legumes" },
            { name: "Greek yogurt (curd substitute)", protein: 10, calories: 59, source: "dairy" },
            { name: "Milk (cow)", protein: 3.4, calories: 61, source: "dairy" },
            { name: "Soy chunks (Nutrela)", protein: 52, calories: 345, source: "legumes" },
            { name: "Soybeans (boiled)", protein: 16, calories: 173, source: "legumes" },
            { name: "Lentils (dal, boiled)", protein: 9, calories: 116, source: "legumes" },
            { name: "Chickpeas (boiled)", protein: 9, calories: 164, source: "legumes" },
            { name: "Kidney beans (rajma boiled)", protein: 8.7, calories: 127, source: "legumes" },
            { name: "Black beans (boiled)", protein: 8.9, calories: 132, source: "legumes" },
            { name: "Peanuts", protein: 25.8, calories: 567, source: "nuts" },
            { name: "Almonds", protein: 21, calories: 579, source: "nuts" },
            { name: "Pumpkin seeds", protein: 30, calories: 559, source: "nuts" },
            { name: "Oats", protein: 17, calories: 389, source: "nuts" },
            { name: "Quinoa (cooked)", protein: 4.4, calories: 120, source: "legumes" },
            { name: "Whey protein powder", protein: 24, calories: 120, source: "dairy" },
            { name: "Cottage cheese (low-fat)", protein: 11.1, calories: 98, source: "dairy" }
        ];

        // Array to store added items
        let addedItems = [];
        let selectedFood = null;

        // Generate food checkboxes
        function generateFoodGrid() {
            const foodGrid = document.getElementById('foodGrid');
            foodGrid.innerHTML = '';
            
            foodData.forEach((food, index) => {
                const div = document.createElement('div');
                div.className = 'food-item';
                div.onclick = function(e) {
                    if (e.target.tagName !== 'INPUT') {
                        const checkbox = document.getElementById('food' + index);
                        checkbox.checked = !checkbox.checked;
                        selectFood(index);
                    }
                };
                
                div.innerHTML = `
                    <div class="food-item-header">
                        <input type="checkbox" id="food${index}" onchange="selectFood(${index})">
                        <label for="food${index}">${food.name}</label>
                    </div>
                    <div class="food-item-info">
                        <div class="food-info-item">
                            <div class="food-info-label">Protein</div>
                            <div class="food-info-value">${food.protein}g</div>
                        </div>
                        <div class="food-info-item">
                            <div class="food-info-label">Calories</div>
                            <div class="food-info-value">${food.calories}</div>
                        </div>
                    </div>
                `;
                
                foodGrid.appendChild(div);
            });
        }

        // Select food function
        function selectFood(index) {
            // Uncheck all checkboxes
            const allCheckboxes = document.querySelectorAll('.food-item input[type="checkbox"]');
            const allItems = document.querySelectorAll('.food-item');
            
            allCheckboxes.forEach((checkbox, i) => {
                if (i !== index) {
                    checkbox.checked = false;
                    allItems[i].classList.remove('selected');
                }
            });
            
            // Select current
            const checkbox = document.getElementById('food' + index);
            if (checkbox.checked) {
                selectedFood = index;
                allItems[index].classList.add('selected');
            } else {
                selectedFood = null;
                allItems[index].classList.remove('selected');
            }
        }

        // Add food to table
        function addFood() {
            const amount = parseFloat(document.getElementById('amount').value);
            
            // Validation
            if (selectedFood === null) {
                alert('Please select a protein source!');
                return;
            }
            
            if (!amount || amount <= 0) {
                alert('Please enter a valid amount!');
                return;
            }
            
            // Calculate protein and calories
            const food = foodData[selectedFood];
            const protein = (food.protein * amount) / 100;
            const calories = (food.calories * amount) / 100;
            
            // Create item object
            const item = {
                id: Date.now(),
                name: food.name,
                amount: amount,
                protein: protein,
                calories: calories
            };
            
            // Add to array
            addedItems.push(item);
            
            // Update display
            updateTable();
            updateStats();
            
            // Clear selection
            document.getElementById('amount').value = '';
            document.getElementById('food' + selectedFood).checked = false;
            document.querySelectorAll('.food-item')[selectedFood].classList.remove('selected');
            selectedFood = null;
        }

        // Delete item
        function deleteItem(id) {
            addedItems = addedItems.filter(item => item.id !== id);
            updateTable();
            updateStats();
        }

        // Update table display
        function updateTable() {
            const tableBody = document.getElementById('tableBody');
            const tableSection = document.getElementById('tableSection');
            
            if (addedItems.length === 0) {
                tableSection.classList.add('hidden');
                return;
            }
            
            tableSection.classList.remove('hidden');
            tableBody.innerHTML = '';
            
            let totalAmount = 0;
            let totalProtein = 0;
            let totalCalories = 0;
            
            addedItems.forEach((item, index) => {
                const row = document.createElement('tr');
                row.style.animationDelay = `${index * 0.1}s`;
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.amount.toFixed(0)}</td>
                    <td>${item.protein.toFixed(1)}</td>
                    <td>${item.calories.toFixed(0)}</td>
                    <td><button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
                
                totalAmount += item.amount;
                totalProtein += item.protein;
                totalCalories += item.calories;
            });
            
            // Update totals
            document.getElementById('totalAmount').textContent = totalAmount.toFixed(0);
            document.getElementById('totalProtein').textContent = totalProtein.toFixed(1);
            document.getElementById('totalCalories').textContent = totalCalories.toFixed(0);
        }

        // Update stats
        function updateStats() {
            const targetInput = document.getElementById('targetProtein');
            const target = parseFloat(targetInput.value);
            
            if (!target || target <= 0) {
                document.getElementById('statsSection').classList.add('hidden');
                return;
            }
            
            document.getElementById('statsSection').classList.remove('hidden');
            
            const totalProtein = addedItems.reduce((sum, item) => sum + item.protein, 0);
            const remaining = target - totalProtein;
            
            document.getElementById('targetDisplay').textContent = target.toFixed(1) + 'g';
            document.getElementById('currentDisplay').textContent = totalProtein.toFixed(1) + 'g';
            document.getElementById('remainingDisplay').textContent = remaining.toFixed(1) + 'g';
            
            // Change color if target met
            const remainingBox = document.querySelector('.stat-box.remaining');
            if (remaining <= 0) {
                remainingBox.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(56, 142, 60, 0.2) 100%)';
                remainingBox.style.borderColor = 'rgba(76, 175, 80, 0.5)';
            } else {
                remainingBox.style.background = 'linear-gradient(135deg, rgba(255, 152, 0, 0.2) 0%, rgba(251, 140, 0, 0.2) 100%)';
                remainingBox.style.borderColor = 'rgba(255, 152, 0, 0.5)';
            }
        }

        // Event listener for target protein input
        document.getElementById('targetProtein').addEventListener('input', updateStats);

        // Filter foods based on search and source
        function filterFoods() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const sourceCheckboxes = document.querySelectorAll('.source-option input[type="checkbox"]');
            const selectedSources = Array.from(sourceCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            
            const foodItems = document.querySelectorAll('.food-item');
            
            foodData.forEach((food, index) => {
                const matches = (
                    (selectedSources.includes('all') || selectedSources.includes(food.source)) &&
                    (food.name.toLowerCase().includes(searchTerm) || searchTerm === '')
                );
                
                if (matches) {
                    foodItems[index].style.display = 'flex';
                } else {
                    foodItems[index].style.display = 'none';
                }
            });
        }

        // Initialize
        generateFoodGrid();