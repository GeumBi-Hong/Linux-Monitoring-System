var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var v;  //cpu
var v2; //mem
var v3; //mem2



function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    // host = document.getElementById("host").value;
    console.log("connect");
    // host=getParameterByName('ip_address');
    //host="54.180.90.198";
    host="54.180.90.198"


    // port = document.getElementById("port").value;
    port="9001";
    // Print output for the user in the messages div
//    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    //   document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({
        onSuccess: onConnect,
    });
//addEmptyValues(values,samples);
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    // topic = document.getElementById("topic").value;
    topic="mon/#";
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

// Called when a message arrives
function onMessageArrived(message) {
    switch(message.destinationName){
        case "mon/cpu/1":
            v = parseFloat(message.payloadString);
            console.log(v);
            break;
        case "mon/mem/nom":
            v2=parseFloat(message.payloadString);
            break;
        case "mon/mem/act":
            v3=parseFloat(message.payloadString);
            break;

    }
    console.log("onMessageArrived: " + message.payloadString);
    document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}


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

    /*
    chart2.config.data.datasets.forEach(function(dataset) {
        dataset.data.push({
            x: Date.now(),
            y: randomScalingFactor()
        });
    });
    */
}

var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Dataset 1 (linear interpolation)',
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            fill: false,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: 'cpu charts'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh
                }
            }],
            yAxes: [{
                ticks: {
                    max:100,
                    min:0,
                    stepSize:10
                },
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
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

var memory_config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Dataset 1 (linear interpolation)',
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            fill: false,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
        }, {
            label: 'Dataset 2 (cubic interpolation)',
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
            text: 'memory charts'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh2
                }
            }],
            yAxes: [{
                ticks: {
                    max:100,
                    min:0,
                    stepSize:10
                },
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
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

window.onload = function() {
    startConnect();
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, config);
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    window.myChart2 = new Chart(ctx2, memory_config);
};