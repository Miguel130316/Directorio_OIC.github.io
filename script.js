document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ramo-select').addEventListener('change', updateTable);
    document.getElementById('enlace-select').addEventListener('change', updateEnlacesTable);

    // Paginación
    let currentPage = 1;
    const recordsPerPage = 10;

    function paginateTable(tableId, currentPage) {
        const table = document.querySelector(`#${tableId} tbody`);
        const rows = Array.from(table.querySelectorAll('tr'));
        const totalRecords = rows.length;

        rows.forEach((row, index) => {
            row.style.display = (index >= (currentPage - 1) * recordsPerPage && index < currentPage * recordsPerPage) ? '' : 'none';
        });

        document.querySelector('.prev-btn').style.display = currentPage > 1 ? 'inline-block' : 'none';
        document.querySelector('.next-btn').style.display = currentPage * recordsPerPage < totalRecords ? 'inline-block' : 'none';
    }

    document.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            paginateTable('OIC-por-Ramo', currentPage);
            paginateTable('Enlaces-OIC-Especificos', currentPage);
        }
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentPage++;
        paginateTable('OIC-por-Ramo', currentPage);
        paginateTable('Enlaces-OIC-Especificos', currentPage);
    });

    function updateTable() {
        const ramo = document.getElementById('ramo-select').value;
        const tableBody = document.querySelector('#OIC-por-Ramo tbody');
        tableBody.innerHTML = '';
        
        const data = {
            "Gobernación": [
                [""],
                // Agregar más registros
            ],
            // Agregar datos similares para otras opciones de RAMO
        };

        if (data[ramo]) {
            data[ramo].forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        }

        currentPage = 1;
        paginateTable('OIC-por-Ramo', currentPage);
    }

    function updateEnlacesTable() {
        const enlace = document.getElementById('enlace-select').value;
        const tableBody = document.querySelector('#Enlaces-OIC-Especificos tbody');
        tableBody.innerHTML = '';
        
        const data = {
            "Administración del Sistema Portuario Nacional Coatzacoalcos S.A. de C.V.": [
                ["Juan Pérez", "Director", "juan.perez@gob.mx", "+52 123 456 7890 Ext. 123", "Ciudad de México", "<a href='documento.pdf' target='_blank'><img src='pdf-icon.png' alt='PDF Icon'> Ver PDF</a>"],
                // Agregar más registros
            ],
            // Agregar datos similares para otras opciones de Enlaces OIC
        };

        if (data[enlace]) {
            data[enlace].forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.innerHTML = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        }

        currentPage = 1;
        paginateTable('Enlaces-OIC-Especificos', currentPage);
    }
});
