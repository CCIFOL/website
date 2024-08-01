document.addEventListener('DOMContentLoaded', () => {
    fetchInventory();
    
    // Add event listener for the search bar
    document.getElementById('search').addEventListener('input', filterTable);
});
  
document.getElementById('inventoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const dateGot = document.getElementById('dateGot').value;
    const quantity = document.getElementById('quantity').value;
    const category = document.getElementById('category').value;
    const formMessage = document.getElementById('formMessage');

    // Reset form message and input styles
    formMessage.textContent = '';
    const inputs = document.querySelectorAll('#inventoryForm input, #inventoryForm select');
    inputs.forEach(input => input.classList.remove('error'));

    const today = new Date().toISOString().split('T')[0];
    if (dateGot > today) {
      formMessage.textContent = 'Date cannot be in the future';
      document.getElementById('dateGot').classList.add('error');
      return;
    }

    if (quantity < 1) {
      formMessage.textContent = 'Quantity must be at least 1';
      document.getElementById('quantity').classList.add('error');
      return;
    }

    try {
      const res = await fetch('https://website-bpjn.onrender.com/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dateGot, quantity, category }),
      });

      const data = await res.json();
      if (res.status !== 200) {
        formMessage.textContent = data.msg || 'An error occurred';
      } else {
        formMessage.textContent = 'Item added successfully';
        addItemToTable(data.item);
        document.getElementById('inventoryForm').reset();
      }
    } catch (err) {
      formMessage.textContent = 'An error occurred';
    }
});
  
const addItemToTable = (item) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${item.name}</td>
      <td>${item.dateGot}</td>
      <td>${item.quantity}</td>
      <td>${item.category}</td>
    `;
    document.getElementById('inventoryTable').appendChild(newRow);
};

const fetchInventory = async () => {
    try {
      const res = await fetch('https://website-bpjn.onrender.com/api/inventory');
      const data = await res.json();
      if (res.status !== 200) {
        console.error('Error fetching inventory:', data.msg);
      } else {
        data.forEach(item => addItemToTable(item));
      }
    } catch (err) {
      console.error('An error occurred while fetching inventory:', err);
    }
};

// Function to filter table rows based on search input
const filterTable = () => {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#inventoryTable tr');

    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let found = false;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent.toLowerCase().includes(searchValue)) {
                found = true;
                break;
            }
        }

        row.style.display = found ? '' : 'none';
    });
};
