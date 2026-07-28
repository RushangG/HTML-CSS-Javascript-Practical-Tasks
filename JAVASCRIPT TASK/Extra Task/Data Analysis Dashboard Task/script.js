const productDataSet = [
    {
        "id": 1,
        "title": "Biotique Bio Kelp Protein Shampoo",
        "category": "beauty",
        "price": 299.00,
        "stock": 99

    },
    {
        "id": 2,
        "title": "Lakme Absolute Spotlight Eyeshadow Palette",
        "category": "beauty",
        "price": 995.00,
        "stock": 34
    },
    {
        "id": 3,
        "title": "Forest Essentials Facial Powder",
        "category": "beauty",
        "price": 1450.00,
        "stock": 89
    },
    {
        "id": 4,
        "title": "Sugar Cosmetics Matte Attack Lipstick",
        "category": "beauty",
        "price": 699.00,
        "stock": 91
    },
    {
        "id": 5,
        "title": "Colorbar Vegan Nail Lacquer",
        "category": "beauty",
        "price": 225.00,
        "stock": 79
    },
    {
        "id": 6,
        "title": "Titan Skinn Raw Eau De Parfum",
        "category": "fragrances",
        "price": 2995.00,
        "stock": 29
    },
    {
        "id": 7,
        "title": "Bombay Shaving Company Oudh Perfume",
        "category": "fragrances",
        "price": 999.00,
        "stock": 58
    },
    {
        "id": 8,
        "title": "Kama Ayurveda Pure Rose Water",
        "category": "fragrances",
        "price": 1495.00,
        "stock": 98
    },
    {
        "id": 9,
        "title": "The Man Company Blanc Body Spray",
        "category": "fragrances",
        "price": 349.00,
        "stock": 4
    },
    {
        "id": 10,
        "title": "Ajmal Aristocrat Magnolia For Her",
        "category": "fragrances",
        "price": 4500.00,
        "stock": 91
    },
    {
        "id": 11,
        "title": "Godrej Interio King Size Solid Wood Bed",
        "category": "furniture",
        "price": 45000.00,
        "stock": 88
    },
    {
        "id": 12,
        "title": "Wakefit 3 Seater Fabric Sofa",
        "category": "furniture",
        "price": 18500.00,
        "stock": 60
    },
    {
        "id": 13,
        "title": "The Sleep Company Bedside Table Sheesham Wood",
        "category": "furniture",
        "price": 4999.00,
        "stock": 64
    },
    {
        "id": 14,
        "title": "Green Soul Ergonomic Office Chair",
        "category": "furniture",
        "price": 8999.00,
        "stock": 26
    },
    {
        "id": 15,
        "title": "Pepperfry Engineered Wood Washbasin Cabinet",
        "category": "furniture",
        "price": 12499.00,
        "stock": 7
    }
];





// Global Variables
let products = [];

// Chart Variables
let barChart;
let lineChart;
let pieChart;


// add dynamic categories to select dropdown
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
            '<td>' + (data[i].price * data[i].stock).toFixed(2) + ' Rs</td>' +
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
    const totalAmount = [];

    for (let i = 0; i < data.length; i++) {
        titles.push(data[i].title);
        prices.push(data[i].price);
        stocks.push(data[i].stock);
        totalAmount.push(data[i].price * data[i].stock);
    }

    // if charts alrdedy exist so destroy them.
    if (barChart) {
        barChart.destroy();
    }

    if (lineChart) {
        lineChart.destroy();
    }

    if (pieChart) {
        pieChart.destroy();
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
        },
        options: {
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Stock of Products',
                    font: {
                        size: 20,
                        color: 'black',
                        family: 'Segoe UI'
                    },
                    fontColor: 'black'
                }
            },

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
        },
        options: {
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Price of Products',
                    font: {
                        size: 20,
                        color: 'black',
                        family: 'Segoe UI'
                    }

                }
            }
        }
    });

    const chart3 = document.getElementById('myPieChart');
    pieChart = new Chart(chart3, {
        type: 'pie',
        data: {
            labels: titles,
            datasets: [{
                label: 'Total(Price * Stock)',
                data: totalAmount
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
            }
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

// Fetch Data 
async function FetchData() {

    // const res = await fetch('https://dummyjson.com/products?limit=15');

    // const data = await res.json();


    console.log(productDataSet);
    // set products to productDataSet
    products = productDataSet;
    loadCategories();
    displayDashboard(products);
}


document.getElementById('category-select').addEventListener('change', filterData);

//dom load.
document.addEventListener('DOMContentLoaded', FetchData);
