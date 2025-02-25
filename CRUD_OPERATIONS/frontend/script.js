const apiUrl = "http://localhost:5000/items"; // Change if necessary

// Fetch and display items
async function fetchItems() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch items!");

        const items = await response.json();

        // Clear lists before updating
        document.getElementById("item-list").innerHTML = "";
        document.getElementById("update-select").innerHTML = "<option value=''>Select an Item</option>";
        document.getElementById("delete-select").innerHTML = "<option value=''>Select an Item</option>";

        items.forEach(item => {
            // Populate Read section
            const li = document.createElement("li");
            li.textContent = `📌 ${item.name}`;
            document.getElementById("item-list").appendChild(li);

            // Populate Update dropdown
            const updateOption = document.createElement("option");
            updateOption.value = item._id;
            updateOption.textContent = item.name;
            document.getElementById("update-select").appendChild(updateOption);

            // Populate Delete dropdown
            const deleteOption = document.createElement("option");
            deleteOption.value = item._id;
            deleteOption.textContent = item.name;
            document.getElementById("delete-select").appendChild(deleteOption);
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        document.getElementById("item-list").innerHTML = "<li>❌ Error loading items!</li>";
    }
}

// Add an item
async function addItem() {
    const itemName = document.getElementById("item-input").value.trim();
    if (!itemName) return alert("Please enter an item name!");

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: itemName })
        });

        if (!response.ok) throw new Error("Failed to add item!");

        document.getElementById("item-input").value = "";
        fetchItems(); // Refresh list
        alert("✅ Item added successfully!");
    } catch (error) {
        console.error("Error adding item:", error);
        alert("❌ Failed to add item.");
    }
}

// Update an item
async function updateItem() {
    const selectedId = document.getElementById("update-select").value;
    const newName = document.getElementById("update-input").value.trim();

    if (!selectedId) return alert("⚠️ Please select an item to update!");
    if (!newName) return alert("⚠️ Please enter a new name!");

    try {
        const response = await fetch(`${apiUrl}/${selectedId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName })
        });

        if (!response.ok) throw new Error("Failed to update item!");

        document.getElementById("update-input").value = "";
        fetchItems(); // Refresh list
        alert("✅ Item updated successfully!");
    } catch (error) {
        console.error("Error updating item:", error);
        alert("❌ Failed to update item.");
    }
}

// Delete an item
async function deleteItem() {
    const selectedId = document.getElementById("delete-select").value;
    if (!selectedId) return alert("⚠️ Please select an item to delete!");

    if (!confirm("⚠️ Are you sure you want to delete this item?")) return;

    try {
        const response = await fetch(`${apiUrl}/${selectedId}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Failed to delete item!");

        fetchItems(); // Refresh list
        alert("✅ Item deleted successfully!");
    } catch (error) {
        console.error("Error deleting item:", error);
        alert("❌ Failed to delete item.");
    }
}

// Load items when page loads
window.onload = fetchItems;
