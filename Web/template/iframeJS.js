//금비 아이피 :192.168.0.29
//브로커 아이피: 54.180.90.198

var samples =20;
var speed = 500;
let timeout = samples * speed;
var values = [];
var values2=[];
var values3=[];
var labels = [];
var charts = [];
var value = 0;
var scale = 1;
var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};


var originalCalculateXLabelRotation = Chart.Scale.prototype.calculateXLabelRotation
var v;  //cpu
var v2; //mem
var v3; //mem2
var v4;
var v5;
var v6;



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var div_ip=document.getElementById('ip_insert')
div_ip.innerText= "IP :"+getParameterByName('ip');
div_ip.style.fontFamily = 'Kumbh Sans', 'sans-serif';
div_ip.style.marginLeft = "20px";
div_ip.style.marginTop = "20px";
div_ip.style.fontSize = "6";

function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    console.log("connect");

    host="54.180.90.198";
    //host="192.168.0.29";
    port="9001"
    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived=onMessageArrivedCertain;

    // Connect the client, if successful, call onConnect function
    client.connect({
        onSuccess: onConnect,
    });

}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    topic="mon/getDB/#";
    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    client.subscribe(topic);

}
// Called when the client loses its connection
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}


// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}

//addEmptyValues(values,samples);
function randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onRefresh(chart) {
    chart.config.data.datasets.forEach(function(dataset) {
        dataset.data.push({
            x: Date.now(),
            y: v
        });
    });
}

function onRefresh2(chart2) {
    var dataArray = chart2.config.data.datasets;
    for(var i = 0; i < dataArray.length; i++) {
        //Memory Active
        if(i == 0) {
            let activeDataSet = dataArray[i];
            activeDataSet.data.push({
                x: Date.now(),
                y: v2
            });
        }
        //Memory inActive
        else {
            let activeDataSet = dataArray[i];
            activeDataSet.data.push({
                x: Date.now(),
                y: v3
            });
        }

    }

}

function onRefresh3(chart) {
    chart.config.data.datasets.forEach(function(dataset) {
        dataset.data.push({
            x: Date.now(),
            y: v4
        });
    });
}

function onRefresh4(chart4) {
    var dataArray = chart4.config.data.datasets;
    for (var i = 0; i < dataArray.length; i++) {
        //Memory Active
        if (i == 0) {
            let activeDataSet = dataArray[i];
            activeDataSet.data.push({
                x: Date.now(),
                y: v5
            });
        }
        //Memory inActive
        else {
            let activeDataSet = dataArray[i];
            activeDataSet.data.push({
                x: Date.now(),
                y: v6
            });
        }

    }
}

var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'cpu usage',
            backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
            borderColor: chartColors.purple,
            fill: false,
            lineTension: 0,
            //borderDash: [8, 4],
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: 'cpu chart'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 10000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh
                }
            }],
            yAxes: [{
                ticks: {
                    max:100,
                    min:0,
                    stepSize:100
                },
            }]
        }
    }
};

var memory_config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'nominal usage',
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            fill: false,
            lineTension: 0,
            //borderDash: [8, 4],
            data: []
        }, {
            label: 'actual usage',
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            fill: false,
            cubicInterpolationMode: 'monotone',
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: 'memory chart'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 10000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh2
                }
            }],
            yAxes: [{
                ticks: {
                    max:100,
                    min:0,
                    stepSize:100
                },
            }]
        }
    }
};

var swap_config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'swap usage',
            backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
            borderColor: chartColors.green,
            fill: false,
            lineTension: 0,
            //borderDash: [8, 4],
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: 'swap chart'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 10000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh3
                }
            }],
            yAxes: [{
                ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 100
                },
            }]
        },
        tooltips: {
            mode: 'nearest',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: false
        }
    }
};
var io_config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'I/O read',
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            fill: false,
            lineTension: 0,
            //borderDash: [8, 4],
            data: []
        }, {
            label: 'I/O write',
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            fill: false,
            cubicInterpolationMode: 'monotone',
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: 'I/O chart'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 10000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh4
                }
            }],
            yAxes: [{
                ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 100
                },
            }]
        }
    }
};

window.onload = function() {
    startConnect();
    //init();
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, config);
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    window.myChart2 = new Chart(ctx2, memory_config);
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    window.myChart3 = new Chart(ctx3, swap_config);
    var ctx4 = document.getElementById('myChart4').getContext('2d');
    window.myChart4 = new Chart(ctx4, io_config);
};



//list
// Builds the HTML Table out of myList json data from Ivy restful service.

var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');
_th_name = document.createElement('th'),
    _th_.setAttribute("id", "process_name");

// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(arr) {
    var table = _table_.cloneNode(false),
        columns = addAllColumnHeaders(arr, table);
    for (var i=0, maxi=arr.length; i < maxi; ++i) {
        var tr = _tr_.cloneNode(false);
        for (var j=0, maxj=columns.length; j < maxj ; ++j) {
            var td = _td_.cloneNode(false);
            cellValue = arr[i][columns[j]];
            td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(arr, table)
{
    var columnSet = [],
        tr = _tr_.cloneNode(false);
    for (var i=0, l=arr.length; i < l; i++) {
        for (var key in arr[i]) {
            if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
                columnSet.push(key);
                var th = _th_.cloneNode(false);
                th.style.width="200px";
                if (i=1){
                    th.style.width="300px";
                }
                th.appendChild(document.createTextNode(key));
                tr.appendChild(th);


            }
        }
    }
    table.appendChild(tr);
    return columnSet;
}



function inet_ntoa(num){

    var hex = num;
    var a = new Array();

    for(var i = 0; i < 4; i++){
        var temp = hex.substring(0,2);
        if(i !=4) hex = hex.substring(2, hex.length)
        a[i] = parseInt(temp, 16)
    }
    return a.join('.');
}

// Called when a message arrives
function onMessageArrivedCertain(message) {
    var IP_hex = message.payloadString.substring(0, 8);
    var data = message.payloadString.substring(8, message.payloadString.length);
    var cur_IP = getParameterByName("ip");

    if (cur_IP == null)
        cur_IP = getParameterByName("ip");


   // console.log(IP_hex)
   // console.log(data)
   // console.log(cur_IP)


    if(inet_ntoa(IP_hex) == cur_IP){
        switch(message.destinationName){
            case "mon/getDB/CPU":
                v = parseFloat(data);
                console.log(v);
                break;
            case "mon/getDB/MEM/nom":
                v2=parseFloat(data);
                break;
            case "mon/getDB/MEM/act":
                v3=parseFloat(data);
                break;
            case "mon/getDB/SWAP":
                v4 = parseFloat(data);
                break;
            case "mon/getDB/IO/read":
                v5 = parseFloat(data);
                break;
            case "mon/getDB/IO/write":
                v6 = parseFloat(data);
                break;

        }
        console.log("onMessageArrived: " + message.payloadString);
        document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    }
}
