const inventoryTable = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];

// Add product to inventory
document.getElementById("addProduct").addEventListener("click", () => {
    const productName = document.getElementById("productName").value.trim().toLowerCase(); // Convert product name to lowercase
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

        // Disable delete functionality by not adding a delete button
        cell4.textContent = "Không thể xóa"; // Text indicating deletion is disabled
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
