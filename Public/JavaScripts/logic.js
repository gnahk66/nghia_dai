
const inventoryTable = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];

// Add product to inventory
document.getElementById("addProduct").addEventListener("click", () => {
    const productName = document.getElementById("productName").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value, 10);

    if (!productName || isNaN(quantity) || quantity <= 0) {
        alert("Vui lòng nhập đầy đủ và chính xác thông tin sản phẩm.");
        return;
    }

    let existingRow = findProductRow(productName);

    if (existingRow) {
        // Update quantity if product already exists
        const currentQty = parseInt(existingRow.cells[2].textContent, 10);
        existingRow.cells[2].textContent = currentQty + quantity;
    } else {
        // Add new product row
        const rowCount = inventoryTable.rows.length;
        const newRow = inventoryTable.insertRow(rowCount);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.textContent = rowCount + 1;
        cell2.textContent = productName;
        cell3.textContent = quantity;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Xóa";
        deleteButton.addEventListener("click", () => {
            inventoryTable.deleteRow(newRow.rowIndex - 1);
            updateTableIndexes();
        });

        cell4.appendChild(deleteButton);
    }

    document.getElementById("inventoryForm").reset();
});

// Export product from inventory
document.getElementById("exportProduct").addEventListener("click", () => {
    const productName = document.getElementById("productName").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value, 10);

    if (!productName || isNaN(quantity) || quantity <= 0) {
        alert("Vui lòng nhập đầy đủ và chính xác thông tin sản phẩm.");
        return;
    }

    let existingRow = findProductRow(productName);

    if (existingRow) {
        const currentQty = parseInt(existingRow.cells[2].textContent, 10);

        if (currentQty < quantity) {
            alert("Số lượng xuất không đủ trong kho.");
            return;
        }

        existingRow.cells[2].textContent = currentQty - quantity;

        // Remove row if quantity reaches 0
        if (currentQty - quantity === 0) {
            inventoryTable.deleteRow(existingRow.rowIndex - 1);
            updateTableIndexes();
        }
    } else {
        alert("Sản phẩm không tồn tại trong kho.");
    }

    document.getElementById("inventoryForm").reset();
});

// Helper function to find product row
function findProductRow(productName) {
    for (let row of inventoryTable.rows) {
        if (row.cells[1].textContent === productName) {
            return row;
        }
    }
    return null;
}

// Update table indexes
function updateTableIndexes() {
    const rows = inventoryTable.rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
    }
}
const express = require('express');
const app = express();

// Serve static files from the Public folder
app.use(express.static('Public'));

// Your routes go here
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

