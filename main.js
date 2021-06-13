noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0; 
difference = 0;

function setup() {
    canvas = createCanvas(550,475);
    canvas.position(590,190);

    video = createCapture(VIDEO);
    video.size(550, 500);

    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose', gotPoses);
}

function draw() {
    background("#FFA500");
    fill("#707070");
    stroke("#707070");
    square(noseX, noseY, difference);
    document.getElementById("size").innerHTML = difference + "px";
}

function modelLoaded () {
    console.log("PoseNet model has been initialized!");
}

function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = " + noseX + " and Nose Y = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("Left Wrist X = " + leftWristX + " , Right Wrist X = " + rightWristX + " and the Difference = " + difference);
    }
}