let video;
let bodyPose;
let poses = [];
let connections;
const previewWidth = 640;
const previewHeight = 480;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
  let canvas = createCanvas(previewWidth, previewHeight);
  canvas.id('detect-canvas');
  canvas.parent(document.getElementById('canvas-container'));

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(previewWidth, previewHeight);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  //get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  push();
  translate(width,0);
  scale(-1, 1);
  // Draw the webcam video
  image(video, 0, 0, previewWidth, previewHeight);

  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.score > 0.1 && pointB.score > 0.1) {
        stroke(255);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.score > 0.1) {
        fill(255);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }

  pop();
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}