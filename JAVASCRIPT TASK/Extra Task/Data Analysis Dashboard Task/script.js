
// Global Variables
let products = [];

// Chart Variables
let barChart;
let lineChart;


// add categories to select dropdown
function loadCategories() {
 
    const select = document.getElementById('category-select');
    const categories = [];

    // push unique categories in array
    for (let i = 0; i < products.length; i++) {
        if (categories.indexOf(products[i].category) === -1) {
            categories.push(products[i].category);
        }
    }

    // Add categories to select dropdown
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option');

        option.value = categories[i];
        option.innerText = categories[i];
        select.appendChild(option);
    }
}

// Calculate Sum, Avg, Min, Max
function calculateStats(data) {
    let sum = 0;
    let min = data[0].price;
    let max = data[0].price;

    for (let i = 0; i < data.length; i++) {
        sum = sum + data[i].price;

        if (data[i].price < min) {
            min = data[i].price;
        }

        if (data[i].price > max) {
            max = data[i].price;
        }
    }

    const avg = sum / data.length;

    document.getElementById('sum-amount').innerText = sum.toFixed(2) + ' Rs';
    document.getElementById('avg-amount').innerText = avg.toFixed(2) + ' Rs';
    document.getElementById('min-amount').innerText = min.toFixed(2) + ' Rs';
    document.getElementById('max-amount').innerText = max.toFixed(2) + ' Rs';
}

// Display Table
function renderTable(data) {
    const body = document.getElementById('table-body');
    body.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const row = '<tr>' +
            '<td>' + data[i].title + '</td>' +
            '<td>' + data[i].category + '</td>' +
            '<td>' + data[i].price + ' Rs</td>' +
            '<td>' + data[i].stock + '</td>' +
            '</tr>';
        body.innerHTML += row;
    }
}

// Render Charts
function renderCharts(data) {
    // Prepare Data for Charts
    const titles = [];
    const prices = [];
    const stocks = [];

    for (let i = 0; i < data.length; i++) {
        titles.push(data[i].title);
        prices.push(data[i].price);
        stocks.push(data[i].stock);
    }

    // if charts alrdedy exist so destroy them.
    if (barChart) {
        barChart.destroy();
    }

    if (lineChart) {
        lineChart.destroy();
    }


    // Bar Chart
    const chart1 = document.getElementById('myBarChart');
    // new Chart(canvas-id, configuration object)
    barChart = new Chart(chart1, {
        type: 'bar',
        data: {
            labels: titles,
            datasets: [{
                label: 'Stock',
                data: stocks
            }]
        }
    });


    // Line Chart
    const chart2 = document.getElementById('myLineChart');
    lineChart = new Chart(chart2, {
        type: 'line',
        data: {
            labels: titles,
            datasets: [{
                label: 'Price',
                data: prices,
                borderColor: 'green'
            }]
        }
    });

}

// Display Dashboard
function displayDashboard(data) {
    calculateStats(data);
    renderTable(data);
    renderCharts(data);
}

// Filter Function
function filterData() {
    const selected = document.getElementById('category-select').value;

    if (selected === 'all') {
        displayDashboard(products);
    } else {
        const filteredList = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].category === selected) {
                filteredList.push(products[i]);
            }
        }
        displayDashboard(filteredList);
    }
}

// Fetch Data from API
async function apiFetch() {

    const res = await fetch('https://dummyjson.com/products?limit=15');

    const data = await res.json();

    console.log(data);
    products = data.products;
    loadCategories();
    displayDashboard(products);
}


document.getElementById('category-select').addEventListener('change', filterData);

//dom load.
document.addEventListener('DOMContentLoaded', apiFetch);
