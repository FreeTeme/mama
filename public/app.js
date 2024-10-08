document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = '';
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.phone}</td>
                    <td>${user.count}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Изменить</button>
                        <button onclick="deleteUser(${user.id})">Удалить</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function searchUser() {
    const phone = document.getElementById('search').value;
    fetch(`/api/users?phone=${phone}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = '';
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.phone}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Изменить</button>
                        <button onclick="deleteUser(${user.id})">Удалить</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function addUser() {
    // Логика для добавления пользователя
}

function editUser(id) {
    // Логика для изменения пользователя
}

function deleteUser(id) {
    // Логика для удаления пользователя
}
